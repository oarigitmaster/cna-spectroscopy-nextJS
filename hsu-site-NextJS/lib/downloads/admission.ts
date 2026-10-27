import "server-only";

import type { CAIRRequestIdentity } from "@/lib/cair/request-identity";

const directActiveByIdentity = new Map<string, number>();
const scanActiveByIdentity = new Map<string, number>();
let directActiveGlobal = 0;
let scanActiveGlobal = 0;
let nextDirectByteAt = 0;

function readLimit(name: string, fallback: number): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isSafeInteger(value) || value < 1 || value > 1000) {
    throw new Error(`${name} must be an integer between 1 and 1000.`);
  }
  return value;
}

function directBytesPerSecond(): number {
  const value = Number(process.env.CAIR_DIRECT_BYTES_PER_SECOND ?? 10 * 1024 * 1024);
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new Error("CAIR_DIRECT_BYTES_PER_SECOND must be a positive integer.");
  }
  return value;
}

async function waitForDirectBandwidth(bytes: number, signal: AbortSignal): Promise<void> {
  const now = Date.now();
  const waitMs = Math.max(0, nextDirectByteAt - now);
  nextDirectByteAt =
    Math.max(now, nextDirectByteAt) + Math.ceil((bytes * 1000) / directBytesPerSecond());
  if (waitMs === 0 || signal.aborted) return;
  await new Promise<void>((resolve) => {
    const timer = setTimeout(done, waitMs);
    function done() {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    }
    signal.addEventListener("abort", done, { once: true });
    if (signal.aborted) done();
  });
}

export function acquireDirectTransferSlot(
  identity: CAIRRequestIdentity,
): (() => void) | null {
  return acquireSlot(identity, directActiveByIdentity, "direct");
}

export function acquireScanSlot(identity: CAIRRequestIdentity): (() => void) | null {
  return acquireSlot(identity, scanActiveByIdentity, "scan");
}

function acquireSlot(
  identity: CAIRRequestIdentity,
  activeByIdentity: Map<string, number>,
  kind: "direct" | "scan",
): (() => void) | null {
  const identityKey =
    identity.kind === "portal-user"
      ? `user:${identity.userID}`
      : `client:${identity.clientId}`;
  const globalLimit = readLimit(
    kind === "direct" ? "CAIR_MAX_DIRECT_TRANSFERS" : "CAIR_MAX_SCANS",
    2,
  );
  const identityLimit = readLimit(
    kind === "direct"
      ? "CAIR_MAX_DIRECT_TRANSFERS_PER_IDENTITY"
      : "CAIR_MAX_SCANS_PER_IDENTITY",
    1,
  );
  const currentIdentity = activeByIdentity.get(identityKey) ?? 0;
  const globalCount = kind === "direct" ? directActiveGlobal : scanActiveGlobal;
  if (globalCount >= globalLimit || currentIdentity >= identityLimit) {
    return null;
  }

  if (kind === "direct") directActiveGlobal += 1;
  else scanActiveGlobal += 1;
  activeByIdentity.set(identityKey, currentIdentity + 1);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (kind === "direct") directActiveGlobal -= 1;
    else scanActiveGlobal -= 1;
    const remaining = (activeByIdentity.get(identityKey) ?? 1) - 1;
    if (remaining <= 0) activeByIdentity.delete(identityKey);
    else activeByIdentity.set(identityKey, remaining);
  };
}

export function releaseSlotWithStream(
  stream: ReadableStream<Uint8Array>,
  release: () => void,
): ReadableStream<Uint8Array> {
  const reader = stream.getReader();
  const abort = new AbortController();
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          release();
          controller.close();
        } else {
          await waitForDirectBandwidth(value.byteLength, abort.signal);
          if (abort.signal.aborted) return;
          controller.enqueue(value);
        }
      } catch (error) {
        release();
        if (!abort.signal.aborted) controller.error(error);
      }
    },
    async cancel(reason) {
      abort.abort();
      try {
        await reader.cancel(reason);
      } finally {
        release();
      }
    },
  });
}
