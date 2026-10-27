import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getCAIRDatasetSource,
} from "@/lib/cair/config";
import {
  getAuthorizedCAIRDatasetForIdentity,
} from "@/lib/cair/request-authorization";
import {
  getCAIRRequestIdentity,
} from "@/lib/cair/request-identity";
import { acquireScanSlot } from "@/lib/downloads/admission";
import {
  getMaxDownloadBytes,
} from "@/lib/downloads/limits";
import {
  buildCAIRArchiveNames,
} from "@/lib/downloads/naming";
import {
  isPublicCAIRPath,
  summarizeCAIRPath,
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

  const release = acquireScanSlot(identity);
  if (!release) {
    return NextResponse.json(
      { error: "Too many active scans. Retry later." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  try {
    const summary =
      await summarizeCAIRPath(
        source.root,
        relativePath,
        dataset.hiddenDirectories,
      );

    const maximumBytes = getMaxDownloadBytes();

    const archive =
      buildCAIRArchiveNames(
        dataset.title,
        source.title,
      );

    return NextResponse.json({
      dataset: {
        id: dataset.id,
        title: dataset.title,
      },

      source: {
        id: source.id,
        title: source.title,
      },

      selection: summary,

      limit: {
        maximumBytes,

        withinLimit:
          summary.totalBytes <=
          maximumBytes,

        remainingBytes: Math.max(
          maximumBytes -
            summary.totalBytes,
          0,
        ),
      },

      archive,
    });
  } catch (error) {
    console.error(
      "Unable to summarize CAIR path:",
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
          "Unable to calculate the selected folder size.",
      },
      {
        status: 502,
      },
    );
  } finally {
    release();
  }
}
