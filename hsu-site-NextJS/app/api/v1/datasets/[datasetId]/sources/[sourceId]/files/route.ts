import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCAIRDatasetSource,
} from "@/lib/cair/config";
import {
  getCAIRRequestIdentity,
} from "@/lib/cair/request-identity";
import {
  getAuthorizedCAIRDatasetForIdentity,
} from "@/lib/cair/request-authorization";
import {
  getCAIRDirectoryInfo,
  isPublicCAIRPath,
  listCAIRDirectory,
} from "@/lib/storage/cair-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    datasetId: string;
    sourceId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  const identity =
    await getCAIRRequestIdentity(request);

  if (!identity) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const {
    datasetId,
    sourceId,
  } = await context.params;

  const dataset =
    getAuthorizedCAIRDatasetForIdentity(
      identity,
      datasetId,
    );

  /*
   * Return 404 for both missing and unauthorized
   * datasets so restricted dataset IDs are not exposed.
   */
  if (!dataset) {
    return NextResponse.json(
      {
        error: "Dataset not found",
      },
      {
        status: 404,
      },
    );
  }

  const source =
    getCAIRDatasetSource(
      dataset,
      sourceId,
    );

  if (!source) {
    return NextResponse.json(
      {
        error: "Data source not found",
      },
      {
        status: 404,
      },
    );
  }

  const relativePath =
    request.nextUrl.searchParams.get(
      "path",
    ) ?? "";

  if (!isPublicCAIRPath(relativePath, dataset.hiddenDirectories)) {
    return NextResponse.json({ error: "Path not found." }, { status: 404 });
  }

  try {
    const entries =
      await listCAIRDirectory(
        source.root,
        relativePath,
      );
    const hidden = new Set(dataset.hiddenDirectories ?? []);
    const files = entries.filter((entry) => !hidden.has(entry.name));

    const sourceDirectory =
      getCAIRDirectoryInfo(source.root);

    return NextResponse.json({
      dataset: {
        id: dataset.id,
        title: dataset.title,
      },

      source: {
        id: source.id,
        title: source.title,
        directoryName: sourceDirectory.name,
      },

      path: relativePath,
      files,
    });
  } catch (error) {
    console.error(
      "Unable to list CAIR directory:",
      {
        datasetId,
        sourceId,
        relativePath,
        identityKind: identity.kind,
        error,
      },
    );

    return NextResponse.json(
      {
        error:
          "Unable to list dataset files.",
      },
      {
        status: 502,
      },
    );
  }
}
