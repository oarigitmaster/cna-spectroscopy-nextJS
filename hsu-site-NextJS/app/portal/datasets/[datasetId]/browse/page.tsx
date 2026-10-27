import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getAuthorizedCAIRDataset } from "@/lib/cair/service";
import {
  isPublicCAIRPath,
  listCAIRDirectory,
} from "@/lib/storage/cair-storage";

export default async function CAIRDirectoryBrowserPage({
  params,
  searchParams,
}: {
  params: Promise<{
    datasetId: string;
  }>;
  searchParams: Promise<{
    path?: string;
  }>;
}) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const { datasetId } = await params;
  const { path: requestedPath } = await searchParams;

  const dataset = getAuthorizedCAIRDataset(
    email,
    datasetId,
  );

  if (!dataset || !dataset.browseRoot) {
    notFound();
  }

  const relativePath = requestedPath?.trim() ?? "";

  if (
    !isPublicCAIRPath(
      relativePath,
      dataset.hiddenDirectories,
    )
  ) {
    notFound();
  }

  const allEntries = await listCAIRDirectory(
    dataset.browseRoot,
    relativePath,
  );

  const hiddenDirectories = new Set(
    dataset.hiddenDirectories ?? [],
  );

  const entries = allEntries.filter(
    (entry) =>
        !(
        entry.type === "directory" &&
        hiddenDirectories.has(entry.name)
        ),
  );

  const currentName =
    relativePath.split("/").filter(Boolean).pop() ??
    dataset.title;

  const parentPath = relativePath
    .split("/")
    .filter(Boolean)
    .slice(0, -1)
    .join("/");

  return (
    <main className="portal-content-page">
      <Link
        className="text-link"
        href={`/portal/datasets/${dataset.id}`}
      >
        ← {dataset.title}
      </Link>

      <p className="eyebrow">
        Data collection
      </p>

      <h1>{currentName}</h1>

      {relativePath ? (
        <p>
          <strong>Location:</strong>{" "}
          {relativePath}
        </p>
      ) : null}

      {relativePath.includes("/") ? (
        <p>
          <Link
            className="text-link"
            href={`/portal/datasets/${dataset.id}/browse?path=${encodeURIComponent(
              parentPath,
            )}`}
          >
            ← Up one folder
          </Link>
        </p>
      ) : (
        <p>
          <Link
            className="text-link"
            href={`/portal/datasets/${dataset.id}`}
          >
            ← All collections
          </Link>
        </p>
      )}

      <div className="card-grid">
        {entries.map((entry) => (
          <article
            className="service-card"
            key={entry.path}
          >
            <p className="eyebrow">
              {entry.type === "directory"
                ? "Folder"
                : "File"}
            </p>

            <h2>{entry.name}</h2>

            {entry.type === "directory" ? (
              <Link
                className="text-link"
                href={`/portal/datasets/${dataset.id}/browse?path=${encodeURIComponent(
                  entry.path,
                )}`}
              >
                Open folder →
              </Link>
            ) : (
              <p>
                {formatFileSize(entry.size)}
              </p>
            )}
          </article>
        ))}

        {!entries.length ? (
          <div className="empty-state">
            <h2>This folder is empty</h2>

            <p>
              No folders or files were found in this
              location.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const unitIndex = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024),
    ),
    units.length - 1,
  );

  const value =
    bytes / Math.pow(1024, unitIndex);

  return `${value.toFixed(
    unitIndex === 0 ? 0 : 1,
  )} ${units[unitIndex]}`;
}
