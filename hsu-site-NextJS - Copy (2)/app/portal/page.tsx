import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { getAuthorizedCAIRDatasets } from "@/lib/cair/service";
import styles from "./portal.module.css";

import { logUserActivity } from "@/lib/users/activity";

export default async function PortalPage() {
  const session = await auth();

  const email = session?.user?.email;
  const name = session?.user?.name;

  if (!email) {
    redirect("/login");
  }

  const displayName =
    name ??
    email.split("@")[0] ??
    "Client";

  const datasets = getAuthorizedCAIRDatasets(email);

  return (
    <section className={styles.content}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>
            Client workspace
          </p>

          <h1>
            Welcome back, {displayName}
          </h1>

          <p className={styles.heroText}>
            Access datasets and data collections
            authorized for your account.
          </p>
        </div>

        <div className={styles.accessBadge}>
          <span
            className={styles.accessDot}
          />

          Authorized client
        </div>
      </div>

      <section className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Available datasets
          </span>

          <strong>{datasets.length}</strong>

          <p>
            Resources currently assigned to your account
          </p>
        </article>

        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            Data collections
          </span>

          <strong>
            {datasets.reduce(
              (total, dataset) => total + dataset.sources.length,
              0
            )}
          </strong>

          <p>
            Authorized collections available across your datasets
          </p>
        </article>

        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>
            API access
          </span>

          <strong className={styles.summaryStatus}>
            Available
          </strong>

          <p>
            Programmatic access to authorized data
          </p>
        </article>
      </section>

      <section
        className={styles.datasetSection}
      >
        <div
          className={styles.sectionHeader}
        >
          <div>
            <p className={styles.eyebrow}>
              Authorized resources
            </p>

            <h2>Your datasets</h2>
          </div>

          <Link
            href="/portal/datasets"
            className={
              styles.viewAllLink
            }
          >
            View all datasets

            <span aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className={styles.datasetGrid}>
          {datasets.map((dataset) => (
            <article
              className={styles.datasetCard}
              key={dataset.id}
            >
              <div className={styles.datasetCardTop}>
                <span className={styles.datasetCategory}>
                  Dataset
                </span>

                <span className={styles.datasetAvailable}>
                  <span aria-hidden="true" />
                  Available
                </span>
              </div>

              <div className={styles.datasetCardBody}>
                <h3>{dataset.title}</h3>

                {dataset.description ? (
                  <p>{dataset.description}</p>
                ) : null}
              </div>

              <div className={styles.datasetCollections}>
                <strong>{dataset.sources.length}</strong>

                <span>
                  {dataset.sources.length === 1
                    ? "data collection"
                    : "data collections"}
                </span>
              </div>

              <Link
                href={`/portal/datasets/${dataset.id}`}
                className={styles.openDatasetButton}
              >
                Open dataset
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}

          {datasets.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No datasets assigned</h3>

              <p>
                Your account does not currently have access to any datasets.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className={styles.notice}>
        <div>
          <p className={styles.eyebrow}>
            Data access notice
          </p>

          <h2>
            Confidential project resources
          </h2>
        </div>

        <p>
          Files available through this
          portal may contain confidential
          or project-restricted
          information. Access, use, and
          redistribution must follow the
          terms of your organization&apos;s
          agreement with the CNA
          Hyperspectral Scanning Unit.
        </p>
      </section>
    </section>
  );
}