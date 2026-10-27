import { NextRequest, NextResponse } from "next/server";

import { getCAIRDatasetSource } from "@/lib/cair/config";
import { getAuthorizedCAIRDatasetForIdentity } from "@/lib/cair/request-authorization";
import { getCAIRRequestIdentity } from "@/lib/cair/request-identity";
import { acquireScanSlot } from "@/lib/downloads/admission";
import {
  buildCAIRManifest,
  isPublicCAIRPath,
  safeRemotePath,
} from "@/lib/storage/cair-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headers = { "Cache-Control": "private, no-store" };
type RouteContext = {
  params: Promise<{ datasetId: string; sourceId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const identity = await getCAIRRequestIdentity(request);
  if (!identity) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  const { datasetId, sourceId } = await context.params;
  const dataset = getAuthorizedCAIRDatasetForIdentity(identity, datasetId);
  const source = dataset && getCAIRDatasetSource(dataset, sourceId);
  if (!source) {
    return NextResponse.json(
      { error: "Data source not found" },
      { status: 404, headers },
    );
  }

  const relativePath = request.nextUrl.searchParams.get("path") ?? "";
  if (
    relativePath.length > 1024 ||
    relativePath.startsWith("/") ||
    relativePath.includes("\\") ||
    !isPublicCAIRPath(relativePath, dataset.hiddenDirectories)
  ) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400, headers });
  }
  try {
    safeRemotePath(source.root, relativePath);
  } catch {
    return NextResponse.json({ error: "Invalid path." }, { status: 400, headers });
  }

  const release = acquireScanSlot(identity);
  if (!release) {
    return NextResponse.json(
      { error: "Too many active scans. Retry later." },
      { status: 429, headers: { ...headers, "Retry-After": "30" } },
    );
  }
  try {
    const manifest = await buildCAIRManifest(
      source.root,
      relativePath,
      dataset.hiddenDirectories,
    );
    return NextResponse.json(
      {
        dataset: { id: dataset.id, title: dataset.title },
        source: { id: source.id, title: source.title },
        manifest,
      },
      { headers },
    );
  } catch (error) {
    console.error("Unable to build CAIR manifest:", { datasetId, sourceId, error });
    return NextResponse.json(
      { error: "Unable to build download manifest." },
      { status: 502, headers },
    );
  } finally {
    release();
  }
}
