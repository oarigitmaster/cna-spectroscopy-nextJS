import DrillcoreExplorer from "@/components/database/DrillcoreExplorer";
import PortalAccessCallout from "@/components/database/PortalAccessCallout";
import styles from "@/components/database/database.module.css";
import { getDrillcoreMapRecords } from "@/lib/data/drillcores";

export const dynamic = "force-dynamic";

export default async function CoreDatabasePage() {
  const drillcores = await getDrillcoreMapRecords();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          HSU drill-core collection
        </p>

        <h1>Explore the drillcore collection</h1>

        <p>
          Explore hyperspectral drillcore scanning projects
          throughout Newfoundland and Labrador. Select a
          location to preview available imagery and analytical
          results from the HSU collection.
        </p>
      </header>

      <PortalAccessCallout />
      <DrillcoreExplorer drillcores={drillcores} />
    </main>
  );
}
