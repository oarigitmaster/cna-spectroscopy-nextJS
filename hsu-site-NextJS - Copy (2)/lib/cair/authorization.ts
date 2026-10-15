import "server-only";

import {
  getCAIRDatasetAccessMap,
  getCAIRDatasetAdminEmails,
  type CAIRDataset,
} from "@/lib/cair/config";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function canAccessDataset(email: string, dataset: CAIRDataset) {
  const normalized = normalizeEmail(email);
  const admins = getCAIRDatasetAdminEmails().map(normalizeEmail);
  if (admins.includes(normalized)) return true;

  const access = getCAIRDatasetAccessMap();
  const allowedIds = Object.entries(access).find(
    ([configuredEmail]) => normalizeEmail(configuredEmail) === normalized,
  )?.[1];

  return allowedIds?.includes(dataset.id) ?? false;
}
