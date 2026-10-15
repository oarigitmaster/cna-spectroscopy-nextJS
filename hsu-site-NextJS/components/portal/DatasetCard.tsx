import Link from "next/link";

import styles from "./DatasetCard.module.css";

type DatasetStatus = "Available" | "Processing";

interface DatasetCardProps {
  title: string;
  project: string;
  description: string;
  category: string;
  fileCount: number;
  updatedAt: string;
  status: DatasetStatus;
  href: string;
}

export default function DatasetCard({
  title,
  project,
  description,
  category,
  fileCount,
  updatedAt,
  status,
  href,
}: DatasetCardProps) {
  const isAvailable = status === "Available";

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.category}>{category}</span>

        <span
          className={
            isAvailable
              ? styles.statusAvailable
              : styles.statusProcessing
          }
        >
          <span className={styles.statusDot} />
          {status}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.project}>{project}</p>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <dl className={styles.metadata}>
        <div>
          <dt>Files</dt>
          <dd>{fileCount}</dd>
        </div>

        <div>
          <dt>Updated</dt>
          <dd>{updatedAt}</dd>
        </div>
      </dl>

      {isAvailable ? (
        <Link href={href} className={styles.openButton}>
          Open dataset
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className={styles.disabledButton}>Processing in progress</span>
      )}
    </article>
  );
}