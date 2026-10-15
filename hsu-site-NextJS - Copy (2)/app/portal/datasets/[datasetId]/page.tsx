import Link from "next/link";
import {
  notFound,
  redirect,
} from "next/navigation";

import { auth } from "@/auth";
import {
  getAuthorizedCAIRDataset,
} from "@/lib/cair/service";
import {
  getCAIRDirectoryInfo,
} from "@/lib/storage/cair-storage";

import styles from "./dataset.module.css";

import {
  ActivityTracker,
} from "@/components/portal/ActivityTracker";

export default async function CAIRDatasetPage({
  params,
}: {
  params: Promise<{
    datasetId: string;
  }>;
}) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const { datasetId } = await params;

  const dataset =
    getAuthorizedCAIRDataset(
      email,
      datasetId,
    );

  /*
   * Return a 404 for both missing and unauthorized
   * datasets so restricted dataset IDs are not exposed.
   */
  if (!dataset) {
    notFound();
  }

  return (
    <main className="portal-content-page">
      <ActivityTracker
        action="dataset.view"
        datasetID={dataset.id}
      />
      <Link
        className="text-link"
        href="/portal/datasets"
      >
        ← Your datasets
      </Link>

      <p className="eyebrow">
        {dataset.category ?? "Dataset"}
      </p>

      <h1>{dataset.title}</h1>

      {dataset.description ? (
        <p>{dataset.description}</p>
      ) : null}

      {dataset.project ? (
        <p>
          <strong>Project:</strong>{" "}
          {dataset.project}
        </p>
      ) : null}

      <div className={styles.collectionList}>
        {dataset.sources.map((source) => {
          const sourceDirectory =
            getCAIRDirectoryInfo(source.root);

          return (
            <Link
              key={source.id}
              href={
                `/portal/datasets/` +
                `${dataset.id}/` +
                `${source.id}`
              }
              className={styles.collectionRow}
            >
              <div
                className={styles.collectionIcon}
                aria-hidden="true"
              >
                <span />
              </div>

              <div className={styles.collectionInfo}>
                <h2>{sourceDirectory.name}</h2>

                <p>
                  Browse files and folders in this
                  data collection.
                </p>
              </div>

              <div className={styles.collectionAction}>
                <span>Browse</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          );
        })}

        {!dataset.sources.length ? (
          <div className={styles.emptyState}>
            <h2>
              No data collections available
            </h2>

            <p>
              This dataset does not currently
              contain any available data
              collections.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}