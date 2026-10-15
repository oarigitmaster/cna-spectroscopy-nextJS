import { notFound } from "next/navigation";

import DrillcoreSlideshow from "@/components/database/DrillcoreSlideshow";
import styles from "@/components/database/database.module.css";
import { getDrillcore, getDrillcoreImages } from "@/lib/data/drillcores";
import { publicS3Asset } from "@/lib/storage/public-s3";
import DrillcoreMineralogyChart from "@/components/database/DrillcoreMineralogyChart";


const detailFields = [
  "Co_No",
  "MasterNo",
  "Library",
  "Property",
  "Commodity_1",
  "NTS_Map",
  "Year_Drill",
  "Geofile_No",
  "Boxes",
  "Length_m",
  "Dip",
  "Azimuth",
  "OB_m",
  "CoreSize",
  "Deposit Type",
  "Scan year",
  "Scan_Type",
  "Comment",
];

export const dynamic = "force-dynamic";

export default async function DrillcorePage({
  params,
}: {
  params: Promise<{ coreID: string }>;
}) {
  const { coreID: encodedId } = await params;
  const id = decodeURIComponent(encodedId);
  const [core, images] = await Promise.all([
    getDrillcore(id),
    getDrillcoreImages(id),
  ]);
  if (!core) notFound();

  const prefix = `webdata/drillcore/${id}`;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Drillcore record</p>
        <h1>{core.Co_No}</h1>
        <p>
          {core.Property || "HSU drillcore"} ·{" "}
          {core.Library || "CNA collection"}
        </p>
      </header>
      <dl className={styles.detailGrid}>
        {detailFields
          .filter((field) => core[field])
          .map((field) => (
            <div key={field}>
              <dt>{field.replaceAll("_", " ")}</dt>
              <dd>{core[field]}</dd>
            </div>
          ))}
      </dl>
      <div className={styles.actions}>
        <a href={publicS3Asset(`${prefix}/preview.jpg`)} target="_blank" rel="noreferrer">
          Open core preview
        </a>
        <a
          href={publicS3Asset(`${prefix}/${id}_DATA_Clean.csv`)}
          target="_blank"
          rel="noreferrer"
        >
          Download HSU data
        </a>
        {core.Custom_Link ? (
          <a href={core.Custom_Link} target="_blank" rel="noreferrer">
            Mines and Energy source
          </a>
        ) : null}
      </div>
      <DrillcoreSlideshow coreId={id} images={images} />
      <DrillcoreMineralogyChart
        coreId={id}
      />
    </main>
  );
}
