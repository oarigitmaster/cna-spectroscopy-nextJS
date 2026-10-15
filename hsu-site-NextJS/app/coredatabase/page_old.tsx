import DatabaseTable from "@/components/database/DatabaseTable";
import styles from "@/components/database/database.module.css";
import { getDrillcores } from "@/lib/data/drillcores";

export const dynamic = "force-dynamic";

export default async function CoreDatabasePage() {
  const drillcores = await getDrillcores();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>HSU drill-core archive</p>
        <h1>Drillcore database</h1>
        <p>
          Browse scanned drillcore records, project metadata, imagery, and
          available analytical products from the live HSU repository.
        </p>
      </header>
      <DatabaseTable
        rows={drillcores}
        columns={[
          { key: "Co_No", label: "DDH no." },
          { key: "Library", label: "Library" },
          { key: "Property", label: "Property" },
          { key: "Commodity_1", label: "Commodity" },
          { key: "NTS_Map", label: "NTS map" },
          { key: "Year_Drill", label: "Drill year" },
          { key: "Length_m", label: "Length (m)" },
          { key: "Scan_Type", label: "Scan type" },
        ]}
        link={{ key: "Co_No", prefix: "/coredatabase" }}
        filterKey="Library"
        searchPlaceholder="Core ID, property, commodity…"
      />
    </main>
  );
}
