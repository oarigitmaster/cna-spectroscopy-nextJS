import "server-only";

import {
  canAccessDataset,
} from "@/lib/cair/authorization";
import {
  getCAIRAPIClientAccessMap,
  getCAIRDatasetById,
  getCAIRDatasets,
  type CAIRDataset,
} from "@/lib/cair/config";
import type {
  CAIRRequestIdentity,
} from "@/lib/cair/request-identity";

function canAPIClientAccessDataset(
  clientId: string,
  dataset: CAIRDataset,
): boolean {
  const accessMap =
    getCAIRAPIClientAccessMap();

  const allowedDatasetIds =
    accessMap[clientId];

  return (
    allowedDatasetIds?.includes(
      dataset.id,
    ) ?? false
  );
}

export function canIdentityAccessDataset(
  identity: CAIRRequestIdentity,
  dataset: CAIRDataset,
): boolean {
  if (
    identity.kind === "portal-user"
  ) {
    return canAccessDataset(
      identity.email,
      dataset,
    );
  }

  return canAPIClientAccessDataset(
    identity.clientId,
    dataset,
  );
}

export function getAuthorizedCAIRDatasetsForIdentity(
  identity: CAIRRequestIdentity,
): CAIRDataset[] {
  return getCAIRDatasets().filter(
    (dataset) =>
      canIdentityAccessDataset(
        identity,
        dataset,
      ),
  );
}

export function getAuthorizedCAIRDatasetForIdentity(
  identity: CAIRRequestIdentity,
  datasetId: string,
): CAIRDataset | undefined {
  const dataset =
    getCAIRDatasetById(datasetId);

  if (
    !dataset ||
    !canIdentityAccessDataset(
      identity,
      dataset,
    )
  ) {
    return undefined;
  }

  return dataset;
}