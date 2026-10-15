import path from "node:path";

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
import {
  CAIRRangeNotSatisfiableError,
  openCAIRFile,
} from "@/lib/storage/cair-storage";
import {
  logUserActivity,
} from "@/lib/users/activity";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    datasetId: string;
    sourceId: string;
  }>;
};

function safeDownloadFilename(
  relativePath: string,
): string {
  const filename =
    path.posix.basename(relativePath);

  return filename.replace(/["\r\n\\]/g, "_");
}

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

  if (!relativePath) {
    return NextResponse.json(
      {
        error: "A file path is required.",
      },
      {
        status: 400,
      },
    );
  }

    const rangeHeader =
    request.headers.get("range");

    try {
      const file =
        await openCAIRFile(
          source.root,
          relativePath,
          rangeHeader,
        );

      if (
        identity.kind === "portal-user" &&
        !rangeHeader
      ) {
        try {
          await logUserActivity({
            userID: identity.userID,
            action: "file.download",
            datasetID: datasetId,
            sourceID: sourceId,
            path: relativePath,
            fileCount: 1,
            totalBytes: file.size,
          });
        } catch (activityError) {
          console.error(
            "Unable to log file download activity:",
            {
              datasetId,
              sourceId,
              relativePath,
              activityError,
            },
          );
        }
      }

      if (
        identity.kind === "portal-user" &&
        !rangeHeader
      ) {
        try {
          await logUserActivity({
            userID: identity.userID,
            action: "file.download",
            datasetID: datasetId,
            sourceID: sourceId,
            path: relativePath,
            fileCount: 1,
            totalBytes: file.size,
          });
        } catch (activityError) {
          console.error(
            "Unable to log file download activity:",
            {
              datasetId,
              sourceId,
              relativePath,
              activityError,
            },
          );
        }
      }

      const filename =
        safeDownloadFilename(
          relativePath,
        );

      const headers =
        new Headers({
          "Accept-Ranges": "bytes",

          "Content-Disposition":
            `attachment; filename="${filename}"`,

          "Content-Length":
            String(file.contentLength),

          "Content-Type":
            "application/octet-stream",

          "Cache-Control":
            "private, no-store",

          "Last-Modified":
            new Date(
              file.modifiedAt * 1000,
            ).toUTCString(),

          "X-Content-Type-Options":
            "nosniff",
        });

      if (file.range) {
        headers.set(
          "Content-Range",
          `bytes ${file.range.start}-` +
            `${file.range.end}/` +
            `${file.size}`,
        );
      }

      return new Response(
        file.stream,
        {
          status:
            file.range ? 206 : 200,
          headers,
        },
      );
    } catch (error) {
      if (
        error instanceof
        CAIRRangeNotSatisfiableError
      ) {
        return new Response(null, {
          status: 416,

          headers: {
            "Accept-Ranges": "bytes",

            "Content-Range":
              `bytes */${error.fileSize}`,

            "Cache-Control":
              "private, no-store",
          },
        });
      }

      console.error(
        "Unable to stream CAIR file:",
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
            "Unable to download the requested file.",
        },
        {
          status: 502,
        },
      );
    }
}