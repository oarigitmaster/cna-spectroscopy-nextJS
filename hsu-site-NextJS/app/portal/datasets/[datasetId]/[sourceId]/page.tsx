import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/auth";
import DatasetDownloadBrowser from "@/components/portal/DatasetDownloadBrowser";
import {
  getCAIRDatasetSource,
} from "@/lib/cair/config";
import {
  getAuthorizedCAIRDataset,
} from "@/lib/cair/service";
import {
  getMaxDownloadBytes,
} from "@/lib/downloads/limits";
import {
  buildCAIRArchiveNames,
} from "@/lib/downloads/naming";
import {
  ActivityTracker,
} from "@/components/portal/ActivityTracker";

export const dynamic = "force-dynamic";

export default async function CAIRDatasetSourcePage({
  params,
}: {
  params: Promise<{
    datasetId: string;
    sourceId: string;
  }>;
}) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const {
    datasetId,
    sourceId,
  } = await params;

  const dataset =
    getAuthorizedCAIRDataset(
      email,
      datasetId,
    );

  if (!dataset) {
    notFound();
  }

  const source =
    getCAIRDatasetSource(
      dataset,
      sourceId,
    );

  if (!source) {
    notFound();
  }

  const maximumBytes =
    getMaxDownloadBytes();

  const archive =
    buildCAIRArchiveNames(
      dataset.title,
      source.title,
    );

  return (
    <main className="portal-content-page">
      <ActivityTracker
        action="source.view"
        datasetID={dataset.id}
        sourceID={source.id}
      />
      <Link
        className="text-link"
        href={`/portal/datasets/${dataset.id}`}
      >
        ← {dataset.title}
      </Link>

      <p className="eyebrow">
        Data collection
      </p>

      <h1>{source.title}</h1>

      <p>
        Browse and select the files or folders
        you want to include in your download.
      </p>

      <DatasetDownloadBrowser
        datasetId={dataset.id}
        sourceId={source.id}
        maximumBytes={maximumBytes}
        archiveFilename={
          archive.filename
        }
        archiveRootFolder={
          archive.rootFolder
        }
      />
    </main>
  );
}