import "server-only";

export type CAIRArchiveNames = {
  filename: string;
  rootFolder: string;
};

function sanitizeArchivePart(
  value: string,
): string {
  const sanitized = value
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[_\-.]+|[_\-.]+$/g, "");

  return sanitized || "Dataset";
}

export function buildCAIRArchiveNames(
  datasetTitle: string,
  sourceTitle: string,
): CAIRArchiveNames {
  const datasetPart =
    sanitizeArchivePart(datasetTitle);

  const sourcePart =
    sanitizeArchivePart(sourceTitle);

  return {
    filename:
      `${datasetPart}_${sourcePart}.zip`,

    /*
     * This is the top-level folder users will
     * see after opening or extracting the ZIP.
     */
    rootFolder:
      `${sourcePart}/`,
  };
}