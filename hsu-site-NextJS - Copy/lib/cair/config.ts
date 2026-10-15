import "server-only";

import fs from "node:fs";
import path from "node:path";

export type CAIRDatasetSource = {
  id: string;
  title: string;
  root: string;
};

export type CAIRDataset = {
  id: string;
  title: string;
  description?: string;
  project?: string;
  category?: string;
  updatedAt?: string;
  status?: "Available" | "Processing";
  browseRoot?: string;
  hiddenDirectories?: string[];
  sources: CAIRDatasetSource[];
};

function parseJson<T>(name: string, fallback: T): T {
  const raw = process.env[name];

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`${name} must contain valid JSON.`);
  }
}

export function getCAIRDatasets(): CAIRDataset[] {
  return readJsonFile<CAIRDataset[]>(
    "CAIR_DATASETS_FILE",
    "config/cair-datasets.json",
  );
}

export function getCAIRDatasetById(id: string) {
  return getCAIRDatasets().find(
    (dataset) => dataset.id === id,
  );
}

export function getCAIRDatasetSource(
  dataset: CAIRDataset,
  sourceId: string,
) {
  return dataset.sources.find(
    (source) => source.id === sourceId,
  );
}

export function getCAIRDatasetAccessMap(): Record<
  string,
  string[]
> {
  return readJsonFile<
    Record<string, string[]>
  >(
    "CAIR_DATASET_ACCESS_FILE",
    "config/cair-dataset-access.local.json",
  );
}

export function getCAIRDatasetAdminEmails(): string[] {
  return parseJson<string[]>(
    "CAIR_DATASET_ADMIN_EMAILS_JSON",
    [],
  );
}

export function getCAIRAPIClientAccessMap(): Record<
  string,
  string[]
> {
  return parseJson<Record<string, string[]>>(
    "CAIR_API_CLIENT_ACCESS_JSON",
    {},
  );
}

function readJsonFile<T>(
  environmentVariable: string,
  defaultPath: string,
): T {
  const configuredPath =
    process.env[environmentVariable] ??
    defaultPath;

  const absolutePath = path.isAbsolute(
    configuredPath,
  )
    ? configuredPath
    : path.join(
        process.cwd(),
        configuredPath,
      );

  let contents: string;

  try {
    contents = fs.readFileSync(
      absolutePath,
      "utf8",
    );
  } catch (error) {
    throw new Error(
      `Unable to read ${environmentVariable} from ${absolutePath}.`,
      {
        cause: error,
      },
    );
  }

  try {
    return JSON.parse(contents) as T;
  } catch (error) {
    throw new Error(
      `${absolutePath} must contain valid JSON.`,
      {
        cause: error,
      },
    );
  }
}