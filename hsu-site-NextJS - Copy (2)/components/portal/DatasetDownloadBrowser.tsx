"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./DatasetDownloadBrowser.module.css";

type CAIRFileEntry = {
  name: string;
  path: string;
  type: "file" | "directory" | "other";
  size: number;
  modifiedAt: number;
};

type SelectedEntry = {
  path: string;
  name: string;
  type: "file" | "directory";
  totalBytes: number;
  fileCount: number;
};

type FilesResponse = {
  path: string;
  files: CAIRFileEntry[];
  error?: string;
};

type SummaryResponse = {
  selection: {
    path: string;
    type: "file" | "directory";
    totalBytes: number;
    fileCount: number;
    directoryCount: number;
  };

  limit: {
    maximumBytes: number;
    withinLimit: boolean;
    remainingBytes: number;
  };

  archive: {
    filename: string;
    rootFolder: string;
  };

  error?: string;
};

type DatasetDownloadBrowserProps = {
  datasetId: string;
  sourceId: string;
  maximumBytes: number;
  archiveFilename: string;
  archiveRootFolder: string;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 bytes";
  }

  const units = [
    "bytes",
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
    bytes / 1024 ** unitIndex;

  return `${value.toLocaleString(undefined, {
    maximumFractionDigits:
      unitIndex === 0 ? 0 : 2,
  })} ${units[unitIndex]}`;
}

function isSameOrChildPath(
  candidatePath: string,
  parentPath: string,
): boolean {
  return (
    candidatePath === parentPath ||
    candidatePath.startsWith(
      `${parentPath}/`,
    )
  );
}

export default function DatasetDownloadBrowser({
  datasetId,
  sourceId,
  maximumBytes,
  archiveFilename,
  archiveRootFolder,
}: DatasetDownloadBrowserProps) {
  const [currentPath, setCurrentPath] =
    useState("");

  const [files, setFiles] =
    useState<CAIRFileEntry[]>([]);

  const [selectedEntries, setSelectedEntries] =
    useState<Map<string, SelectedEntry>>(
      new Map(),
    );

  const [loadingDirectory, setLoadingDirectory] =
    useState(true);

  const [pendingPath, setPendingPath] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [preparingZip, setPreparingZip] =
    useState(false);

  const selectedBytes = useMemo(() => {
    return Array.from(
      selectedEntries.values(),
    ).reduce(
      (total, entry) =>
        total + entry.totalBytes,
      0,
    );
  }, [selectedEntries]);

  const selectedFileCount = useMemo(() => {
    return Array.from(
      selectedEntries.values(),
    ).reduce(
      (total, entry) =>
        total + entry.fileCount,
      0,
    );
  }, [selectedEntries]);

  const percentageUsed = Math.min(
    (selectedBytes / maximumBytes) * 100,
    100,
  );

  const loadDirectory = useCallback(
    async (path: string) => {
      setLoadingDirectory(true);
      setError(null);

      const parameters =
        new URLSearchParams();

      if (path) {
        parameters.set("path", path);
      }

      const query = parameters.toString();

      const url =
        `/api/v1/datasets/` +
        `${encodeURIComponent(datasetId)}/` +
        `sources/` +
        `${encodeURIComponent(sourceId)}/` +
        `files${query ? `?${query}` : ""}`;

      try {
        const response = await fetch(url, {
          cache: "no-store",
        });

        const data =
          (await response.json()) as
            FilesResponse;

        if (!response.ok) {
          throw new Error(
            data.error ??
              "Unable to load this folder.",
          );
        }

        setFiles(data.files);
        setCurrentPath(data.path);
      } catch (caughtError) {
        setFiles([]);

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load this folder.",
        );
      } finally {
        setLoadingDirectory(false);
      }
    },
    [datasetId, sourceId],
  );

  useEffect(() => {
    void loadDirectory("");
  }, [loadDirectory]);

  function hasSelectedAncestor(
    entryPath: string,
  ): boolean {
    return Array.from(
      selectedEntries.values(),
    ).some(
      (selectedEntry) =>
        selectedEntry.type ===
          "directory" &&
        entryPath !==
          selectedEntry.path &&
        isSameOrChildPath(
          entryPath,
          selectedEntry.path,
        ),
    );
  }

  async function selectEntry(
    entry: CAIRFileEntry,
  ) {
    setError(null);

    if (selectedEntries.has(entry.path)) {
      const next =
        new Map(selectedEntries);

      next.delete(entry.path);

      setSelectedEntries(next);
      return;
    }

    if (hasSelectedAncestor(entry.path)) {
      setError(
        "This item is already included through a selected parent folder.",
      );

      return;
    }

    setPendingPath(entry.path);

    const parameters =
      new URLSearchParams({
        path: entry.path,
      });

    const url =
      `/api/v1/datasets/` +
      `${encodeURIComponent(datasetId)}/` +
      `sources/` +
      `${encodeURIComponent(sourceId)}/` +
      `summary?${parameters.toString()}`;

    try {
      const response = await fetch(url, {
        cache: "no-store",
      });

      const data =
        (await response.json()) as
          SummaryResponse;

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to calculate the selected size.",
        );
      }

      /*
       * If a parent folder is selected after one
       * of its children, remove those children.
       * They will already be included in the parent.
       */
      const next =
        new Map(selectedEntries);

      for (const selectedPath of next.keys()) {
        if (
          selectedPath !== entry.path &&
          isSameOrChildPath(
            selectedPath,
            entry.path,
          )
        ) {
          next.delete(selectedPath);
        }
      }

      const remainingBytes =
        Array.from(next.values()).reduce(
          (total, selectedEntry) =>
            total +
            selectedEntry.totalBytes,
          0,
        );

      const proposedTotal =
        remainingBytes +
        data.selection.totalBytes;

      if (proposedTotal > maximumBytes) {
        setError(
          `This selection would total ` +
            `${formatBytes(proposedTotal)}, ` +
            `which exceeds the ` +
            `${formatBytes(maximumBytes)} limit.`,
        );

        return;
      }

      next.set(entry.path, {
        path: entry.path,
        name: entry.name,
        type: data.selection.type,
        totalBytes:
          data.selection.totalBytes,
        fileCount:
          data.selection.fileCount,
      });

      setSelectedEntries(next);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to select this item.",
      );
    } finally {
      setPendingPath(null);
    }
  }

  async function prepareZip() {
    if (!selectedEntries.size) {
      return;
    }

    setPreparingZip(true);
    setError(null);

    const url =
      `/api/v1/datasets/` +
      `${encodeURIComponent(datasetId)}/` +
      `sources/` +
      `${encodeURIComponent(sourceId)}/` +
      `archive`;

    const paths = Array.from(
      selectedEntries.values(),
    ).map((entry) => entry.path);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          paths,
        }),
      });

      if (!response.ok) {
        let message =
          "Unable to prepare the ZIP download.";

        try {
          const data =
            (await response.json()) as {
              error?: string;
            };

          if (data.error) {
            message = data.error;
          }
        } catch {
          // Keep the fallback message.
        }

        throw new Error(message);
      }

      const blob =
        await response.blob();

      const downloadUrl =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = downloadUrl;
      link.download = archiveFilename;

      document.body.appendChild(link);

      link.click();
      link.remove();

      URL.revokeObjectURL(
        downloadUrl,
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to prepare the ZIP download.",
      );
    } finally {
      setPreparingZip(false);
    }
  }

  function clearSelection() {
    setSelectedEntries(new Map());
    setError(null);
  }

  function goToParentFolder() {
    if (!currentPath) {
      return;
    }

    const segments =
      currentPath.split("/");

    segments.pop();

    void loadDirectory(
      segments.join("/"),
    );
  }

  const breadcrumbs = currentPath
    ? currentPath.split("/")
    : [];

  return (
    <div className={styles.browser}>
      <section
        className={styles.selectionPanel}
      >
        <div>
          <p className={styles.label}>
            Download package
          </p>

          <h2>{archiveFilename}</h2>

          <p>
            ZIP contents will be placed inside{" "}
            <code>{archiveRootFolder}</code>.
          </p>
        </div>

        <div className={styles.sizeSummary}>
          <strong>
            {formatBytes(selectedBytes)}
          </strong>

          <span>
            {" "}of{" "}
            {formatBytes(maximumBytes)}
          </span>
        </div>

        <div
          className={styles.progressTrack}
          aria-label="Selected download size"
        >
          <div
            className={styles.progressValue}
            style={{
              width: `${percentageUsed}%`,
            }}
          />
        </div>

        <p className={styles.selectionDetails}>
          {selectedEntries.size} selected{" "}
          {selectedEntries.size === 1
            ? "item"
            : "items"}
          {" · "}
          {selectedFileCount.toLocaleString()}{" "}
          {selectedFileCount === 1
            ? "file"
            : "files"}
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={clearSelection}
            disabled={!selectedEntries.size}
          >
            Clear selection
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => {
              void prepareZip();
            }}
            disabled={
              !selectedEntries.size ||
              preparingZip
            }
          >
            {preparingZip
              ? "Preparing..."
              : "Prepare ZIP"}
          </button>
        </div>

        {selectedEntries.size > 0 ? (
          <div className={styles.selectedList}>
            <h3>Selected data</h3>

            {Array.from(
              selectedEntries.values(),
            ).map((entry) => (
              <div
                className={styles.selectedRow}
                key={entry.path}
              >
                <div>
                  <strong>{entry.name}</strong>

                  <small>{entry.path}</small>
                </div>

                <span>
                  {formatBytes(
                    entry.totalBytes,
                  )}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className={styles.filePanel}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.backButton}
            onClick={goToParentFolder}
            disabled={!currentPath}
          >
            ← Up one folder
          </button>

          <button
            type="button"
            className={styles.rootButton}
            onClick={() =>
              void loadDirectory("")
            }
            disabled={!currentPath}
          >
            Data root
          </button>
        </div>

        <nav
          className={styles.breadcrumbs}
          aria-label="Current folder"
        >
          <button
            type="button"
            onClick={() =>
              void loadDirectory("")
            }
          >
            Root
          </button>

          {breadcrumbs.map(
            (segment, index) => {
              const breadcrumbPath =
                breadcrumbs
                  .slice(0, index + 1)
                  .join("/");

              return (
                <span key={breadcrumbPath}>
                  <span>/</span>

                  <button
                    type="button"
                    onClick={() =>
                      void loadDirectory(
                        breadcrumbPath,
                      )
                    }
                  >
                    {segment}
                  </button>
                </span>
              );
            },
          )}
        </nav>

        {error ? (
          <div
            className={styles.error}
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {loadingDirectory ? (
          <div className={styles.loading}>
            Loading folder…
          </div>
        ) : (
          <div className={styles.fileList}>
            {files.map((entry) => {
              const isSelected =
                selectedEntries.has(
                  entry.path,
                );

              const includedByParent =
                hasSelectedAncestor(
                  entry.path,
                );

              const isPending =
                pendingPath === entry.path;

              return (
                <div
                  className={styles.fileRow}
                  key={entry.path}
                >
                  <input
                    type="checkbox"
                    checked={
                      isSelected ||
                      includedByParent
                    }
                    disabled={
                      entry.type === "other" ||
                      includedByParent ||
                      isPending
                    }
                    aria-label={`Select ${entry.name}`}
                    onChange={() =>
                      void selectEntry(entry)
                    }
                  />

                  <div
                    className={styles.fileInformation}
                  >
                    {entry.type ===
                    "directory" ? (
                      <button
                        type="button"
                        className={
                          styles.folderButton
                        }
                        onClick={() =>
                          void loadDirectory(
                            entry.path,
                          )
                        }
                      >
                        📁 {entry.name}
                      </button>
                    ) : (
                      <strong>
                        📄 {entry.name}
                      </strong>
                    )}

                    <small>
                      {entry.type ===
                      "directory"
                        ? isPending
                          ? "Calculating folder size…"
                          : "Folder"
                        : formatBytes(
                            entry.size,
                          )}
                    </small>
                  </div>

                  {entry.type === "file" ? (
                    <a
                      className={
                        styles.downloadLink
                      }
                      href={
                        `/api/v1/datasets/` +
                        `${encodeURIComponent(
                          datasetId,
                        )}/sources/` +
                        `${encodeURIComponent(
                          sourceId,
                        )}/download?` +
                        new URLSearchParams({
                          path: entry.path,
                        }).toString()
                      }
                    >
                      Download
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={styles.openButton}
                      onClick={() =>
                        void loadDirectory(
                          entry.path,
                        )
                      }
                    >
                      Open →
                    </button>
                  )}
                </div>
              );
            })}

            {!files.length ? (
              <div className={styles.empty}>
                This folder is empty.
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}