import DatabaseTable from "@/components/database/DatabaseTable";
import styles from "@/components/database/database.module.css";
import { getMinerals } from "@/lib/data/minerals";

export const dynamic = "force-dynamic";

export default async function MineralDatabasePage() {
  const minerals = await getMinerals();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Open spectroscopy resource</p>
        <h1>Minerals database</h1>
        <p>
          Search the College of the North Atlantic mineral spectroscopy
          collection. Records are loaded directly from the live HSU data
          repository.
        </p>
      </header>
      <DatabaseTable
        rows={minerals}
        columns={[
          { key: "ID", label: "ID" },
          { key: "Name", label: "Mineral" },
          { key: "Group", label: "Group" },
          { key: "Type", label: "Type" },
          { key: "Chemistry", label: "Chemistry" },
          { key: "Absorptions", label: "Absorptions (nm)" },
          { key: "Peaks", label: "LIBS peaks (nm)" },
        ]}
        link={{ key: "ID", prefix: "/minerals" }}
        filterKey="Group"
        searchPlaceholder="Mineral, chemistry, absorption…"
      />
    </main>
  );
}
