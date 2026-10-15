import "server-only";

import { canAccessDataset } from "@/lib/cair/authorization";
import {
  getCAIRDatasetById,
  getCAIRDatasets,
  type CAIRDataset,
} from "@/lib/cair/config";

export function getAuthorizedCAIRDatasets(email: string): CAIRDataset[] {
  return getCAIRDatasets().filter((dataset) =>
    canAccessDataset(email, dataset),
  );
}

export function getAuthorizedCAIRDataset(email: string, datasetId: string) {
  const dataset = getCAIRDatasetById(datasetId);
  if (!dataset || !canAccessDataset(email, dataset)) return undefined;
  return dataset;
}

export function publicCAIRDatasetMetadata(
  dataset: CAIRDataset,
) {
  return {
    ...dataset,

    /*
     * Remove the private SFTP root from every source
     * before returning dataset information to a browser.
     */
    sources: dataset.sources.map(
      ({ root: _root, ...source }) => source,
    ),
  };
}
