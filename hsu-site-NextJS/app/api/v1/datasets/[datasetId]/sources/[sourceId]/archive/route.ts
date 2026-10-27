import { Readable } from "node:stream";

import {
  Archiver,
  ZipArchive,
} from "archiver";
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
import { readJsonWithLimit, RequestBodyTooLargeError } from "@/lib/cair/request-body";
import { acquireDirectTransferSlot, releaseSlotWithStream } from "@/lib/downloads/admission";
import {
  getMaxDownloadBytes,
} from "@/lib/downloads/limits";
import {
  buildCAIRManifest,
  isPublicCAIRPath,
  openCAIRFile,
  safeRemotePath,
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

function safeArchiveEntryPath(
  relativePath: string,
): string {
  return relativePath
    .split("/")
    .filter(
      (part) =>
        part &&
        part !== "." &&
        part !== "..",
    )
    .join("/");
}

async function appendCAIRFileToArchive(
  archive: Archiver,
  root: string,
  remotePath: string,
  archivePath: string,
) {
  const openedFile =
    await openCAIRFile(
      root,
      remotePath,
    );

  const reader =
    openedFile.stream.getReader();

  const nodeStream =
    new Readable({
      async read() {
        try {
          const {
            done,
            value,
          } = await reader.read();

          if (done) {
            this.push(null);
            return;
          }

          this.push(
            Buffer.from(value),
          );
        } catch (error) {
          this.destroy(
            error instanceof Error
              ? error
              : new Error(
                  "Failed to read CAIR file stream.",
                ),
          );
        }
      },

      destroy(error, callback) {
        reader
          .cancel()
          .catch(() => {
            // Ignore cancellation errors
            // during stream cleanup.
          })
          .finally(() => {
            callback(error);
          });
      },
    });

  const safePath =
    safeArchiveEntryPath(
      archivePath,
    );

  if (!safePath) {
    throw new Error(
      "Unable to determine ZIP entry path.",
    );
  }

  await new Promise<void>(
    (resolve, reject) => {
      nodeStream.once(
        "end",
        resolve,
      );

      nodeStream.once(
        "error",
        reject,
      );

      archive.append(
        nodeStream,
        {
          name: safePath,
        },
      );
    },
  );
}

export async function POST(
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

  let body: unknown;

  try {
    body = await readJsonWithLimit(request, 64 * 1024);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
    }
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      },
    );
  }

  const paths =
    typeof body === "object" &&
    body !== null &&
    "paths" in body &&
    Array.isArray(body.paths)
      ? body.paths.filter(
          (value): value is string =>
            typeof value === "string",
        )
      : [];

  if (!paths.length) {
    return NextResponse.json(
      {
        error:
          "At least one file or folder must be selected.",
      },
      {
        status: 400,
      },
    );
  }

  if (
    paths.length > 100 ||
    paths.some((selectedPath) => {
      if (
        selectedPath.length > 1024 ||
        selectedPath.startsWith("/") ||
        selectedPath.includes("\\") ||
        !isPublicCAIRPath(selectedPath, dataset.hiddenDirectories)
      ) return true;
      try {
        safeRemotePath(source.root, selectedPath);
        return false;
      } catch {
        return true;
      }
    })
  ) {
    return NextResponse.json(
      { error: "Too many selections or an invalid path." },
      { status: 400 },
    );
  }

  const release = acquireDirectTransferSlot(identity);
  if (!release) {
    return NextResponse.json(
      { error: "Too many active direct downloads. Retry later." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  try {
    const manifests: Awaited<
      ReturnType<
        typeof buildCAIRManifest
      >
    >[] = [];

    for (
      const selectedPath
      of paths
    ) {
      const manifest =
        await buildCAIRManifest(
          source.root,
          selectedPath,
          dataset.hiddenDirectories,
        );

      manifests.push(manifest);
    }

    const totalBytes =
      manifests.reduce(
        (total, manifest) =>
          total +
          manifest.totalBytes,
        0,
      );

    const fileCount =
      manifests.reduce(
        (total, manifest) =>
          total +
          manifest.fileCount,
        0,
      );

    const maxDownloadBytes = getMaxDownloadBytes();

    if (
      totalBytes >
      maxDownloadBytes
    ) {
      release();
      return NextResponse.json(
        {
          error:
            "The selected download exceeds the maximum allowed size.",
          totalBytes,
          maxDownloadBytes,
        },
        {
          status: 413,
        },
      );
    }

    if (fileCount === 0) {
      release();
      return NextResponse.json(
        {
          error:
            "The selected download contains no files.",
        },
        {
          status: 400,
        },
      );
    }

    if (identity.kind === "portal-user") {
      try {
        await logUserActivity({
          userID: identity.userID,
          action: "archive.download",
          datasetID: datasetId,
          sourceID: sourceId,

          path:
            paths.length === 1
              ? paths[0]
              : undefined,

          fileCount,
          totalBytes,
        });
      } catch (activityError) {
        console.error(
          "Unable to log archive download activity:",
          {
            datasetId,
            sourceId,
            activityError,
          },
        );
      }
    }

    const archive =
        new ZipArchive({
            zlib: {
            level: 1,
            },
        });


    const output = Readable.toWeb(archive as unknown as Readable) as ReadableStream<Uint8Array>;

    void (async () => {
      try {
        for (const manifest of manifests) {
          for (const file of manifest.files) {
            await appendCAIRFileToArchive(
              archive,
              source.root,
              file.path,
              file.path,
            );
          }
        }
        await archive.finalize();
      } catch (error) {
        console.error("Failed while streaming CAIR ZIP:", error);
        archive.destroy(
          error instanceof Error ? error : new Error("Failed while streaming CAIR ZIP."),
        );
      }
    })();

    return new Response(
      releaseSlotWithStream(output, release),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/zip",

          "Content-Disposition":
            'attachment; filename="download.zip"',

          "Cache-Control":
            "private, no-store",
        },
      },
    );
  } catch (error) {
    release();
    console.error(
      "Failed to prepare CAIR archive:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to prepare the selected download.",
      },
      {
        status: 500,
      },
    );
  }
}
