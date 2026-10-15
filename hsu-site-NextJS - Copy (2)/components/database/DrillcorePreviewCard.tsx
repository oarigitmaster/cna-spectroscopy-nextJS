import Link from "next/link";

import type { DrillcoreMapRecord } from "@/lib/data/drillcores";

import styles from "./DrillcoreExplorer.module.css";

type DrillcorePreviewCardProps = {
  core: DrillcoreMapRecord | null;
};

export default function DrillcorePreviewCard({
  core,
}: DrillcorePreviewCardProps) {
  if (!core) {
    return (
      <aside className={styles.previewCard}>
        <div className={styles.previewEmpty}>
          <span>Explore the collection</span>

          <h2>Select a drillcore</h2>

          <p>
            Hover over a drillcore location on the map to preview the
            available HSU data.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.previewCard}>
      <div className={styles.previewImage}>
        <img
          src={core.previewUrl}
          alt={`Preview of drillcore ${core.id}`}
        />
      </div>

      <div className={styles.previewContent}>
        {core.library && (
          <p className={styles.previewLibrary}>
            {core.library}
          </p>
        )}

        <h2>{core.id}</h2>

        {core.property && (
          <p className={styles.previewProperty}>
            {core.property}
          </p>
        )}

        <div className={styles.previewMetadata}>
          {core.commodity && (
            <div>
              <span>Commodity</span>
              <strong>{core.commodity}</strong>
            </div>
          )}

          {core.year && (
            <div>
              <span>Drilled</span>
              <strong>{core.year}</strong>
            </div>
          )}

          {core.length && (
            <div>
              <span>Length</span>
              <strong>{core.length} m</strong>
            </div>
          )}

          {core.scanType && (
            <div>
              <span>Scan</span>
              <strong>{core.scanType}</strong>
            </div>
          )}
        </div>

        <Link
          href={`/coredatabase/${encodeURIComponent(core.id)}`}
          className={styles.exploreLink}
        >
          Explore drillcore →
        </Link>
      </div>
    </aside>
  );
}