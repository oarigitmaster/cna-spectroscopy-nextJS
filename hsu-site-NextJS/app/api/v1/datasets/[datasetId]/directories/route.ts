import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCAIRRequestIdentity,
} from "@/lib/cair/request-identity";

import {
  getAuthorizedCAIRDatasetForIdentity,
} from "@/lib/cair/request-authorization";
import { acquireScanSlot } from "@/lib/downloads/admission";

import {
  isPublicCAIRPath,
  listCAIRDirectory,
} from "@/lib/storage/cair-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const responseHeaders = {
  "Cache-Control": "private, no-store",
};

type RouteContext = {
  params: Promise<{
    datasetId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  // Step 1: Authenticate the requester.
  const identity =
    await getCAIRRequestIdentity(request);

  if (!identity) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: responseHeaders,
      },
    );
  }

  const { datasetId } = await context.params;

  // Step 2: Verify dataset authorization.
  const dataset =
    getAuthorizedCAIRDatasetForIdentity(
      identity,
      datasetId,
    );

  if (!dataset) {
    return NextResponse.json(
      { error: "Dataset not found." },
      {
        status: 404,
        headers: responseHeaders,
      },
    );
  }

  if (!dataset.browseRoot) {
    return NextResponse.json(
      {
        error:
          "This dataset does not have a browse root configured.",
      },
      {
        status: 400,
        headers: responseHeaders,
      },
    );
  }

  const relativePath =
    request.nextUrl.searchParams.get("path")?.trim() ?? "";

  if (
    !isPublicCAIRPath(
      relativePath,
      dataset.hiddenDirectories,
    )
  ) {
    return NextResponse.json(
      { error: "Directory not found." },
      {
        status: 404,
        headers: responseHeaders,
      },
    );
  }

  const release = acquireScanSlot(identity);
  if (!release) {
    return NextResponse.json(
      { error: "Too many active scans. Retry later." },
      { status: 429, headers: { ...responseHeaders, "Retry-After": "30" } },
    );
  }

  try {
    const entries = await listCAIRDirectory(
      dataset.browseRoot,
      relativePath,
    );

    const hiddenDirectories = new Set(
      dataset.hiddenDirectories ?? [],
    );

    const directories = entries
      .filter(
        (entry) =>
          entry.type === "directory" &&
          !hiddenDirectories.has(entry.name),
      )
      .map((entry) => ({
        name: entry.name,
        path: entry.path,
      }));

    return NextResponse.json(
      {
        dataset: {
          id: dataset.id,
          title: dataset.title,
        },
        path: relativePath,
        directories,
      },
      {
        headers: responseHeaders,
      },
    );
  } catch (error) {
    console.error(
      `Unable to list directories for dataset "${datasetId}".`,
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to list dataset directories.",
      },
      {
        status: 500,
        headers: responseHeaders,
      },
    );
  } finally {
    release();
  }
}
