import "server-only";

const DEFAULT_MAX_DOWNLOAD_BYTES =
  5 * 1024 * 1024 * 1024;

const DEFAULT_MAX_SCAN_ENTRIES =
  250_000;

function readPositiveInteger(
  name: string,
  fallback: number,
): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  if (
    !Number.isSafeInteger(value) ||
    value <= 0
  ) {
    throw new Error(
      `${name} must be a positive integer.`,
    );
  }

  return value;
}

export function getMaxDownloadBytes(): number {
  return readPositiveInteger(
    "CAIR_MAX_DOWNLOAD_BYTES",
    DEFAULT_MAX_DOWNLOAD_BYTES,
  );
}

export function getMaxScanEntries(): number {
  return readPositiveInteger(
    "CAIR_MAX_SCAN_ENTRIES",
    DEFAULT_MAX_SCAN_ENTRIES,
  );
}

