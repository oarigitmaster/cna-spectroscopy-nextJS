// Compatibility exports for older imports. New code should import from
// lib/data/* and lib/storage/* directly.
export type { DataRow, StoredImage } from "@/lib/data/types";
export { getMineral, getMinerals } from "@/lib/data/minerals";
export {
  getDrillcore,
  getDrillcoreImages,
  getDrillcores,
} from "@/lib/data/drillcores";
export {
  PUBLIC_S3_BASE_URL as S3_BUCKET_URL,
  publicS3Asset as s3Asset,
} from "@/lib/storage/public-s3";
