import "server-only";

import AWS from "aws-sdk";

export const PUBLIC_S3_BASE_URL =
  process.env.HSU_S3_BASE_URL ??
  "https://cna-webfiles.s3.us-east-1.amazonaws.com";

const S3_BUCKET = process.env.AWS_S3_BUCKET ?? "cna-webfiles";
const s3 = new AWS.S3({
  region: process.env.AWS_REGION ?? "us-east-1",
});

export async function fetchPublicS3(path: string) {
  const response = await fetch(`${PUBLIC_S3_BASE_URL}/${path}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Unable to load ${path} (${response.status})`);
  }

  return response;
}

export async function listPublicS3Keys(prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const page = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
      .promise();

    keys.push(
      ...(page.Contents ?? []).flatMap((object) =>
        object.Key ? [object.Key] : [],
      ),
    );

    continuationToken = page.IsTruncated
      ? page.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return keys;
}

export function publicS3Asset(path: string) {
  return `${PUBLIC_S3_BASE_URL}/${path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}
