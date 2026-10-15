// src/lib/env.ts

function requireServerVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "CNA Hyperspectral Scanning Unit",
};

export function getServerEnv() {
  return {
    awsRegion: requireServerVariable("AWS_REGION"),
    s3Bucket: requireServerVariable("AWS_S3_BUCKET"),
  };
}
