import { notFound } from "next/navigation";

import styles from "@/components/database/database.module.css";
import { MineralComparisonChart } from "@/components/minerals/MineralComparisonChart";
import { getMineral, getMinerals } from "@/lib/data/minerals";
import { publicS3Asset } from "@/lib/storage/public-s3";

export const dynamic = "force-dynamic";

const detailFields = [
  "ID",
  "Name",
  "Group",
  "Collection",
  "Type",
  "Dana Classification",
  "Chemistry",
  "Provenance",
  "Absorptions",
  "Peaks",
];

export default async function MineralPage({
  params,
}: {
  params: Promise<{ mineral: string }>;
}) {
  const { mineral: encodedId } = await params;
  const id = decodeURIComponent(encodedId);

  const mineral = await getMineral(id);
  const minerals = await getMinerals();

  if (!mineral) {
    notFound();
  }

  const assets = [
    ["Sample photograph", `${id}_Photo.jpg`],
    ["LIBS spectrum", `${id}_LIBS.png`],
    [
      "VNIR–SWIR–MWIR spectrum",
      `${id}_Reflectance_spectrum_VNIR-SWIR-MWIR.png`,
    ],
    [
      "LWIR spectrum",
      `${id}_Reflectance_spectrum_LWIR.png`,
    ],
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          Mineral record · {id}
        </p>

        <h1>{mineral.Name}</h1>
      </header>

      <dl className={styles.detailGrid}>
        {detailFields
          .filter((field) => mineral[field])
          .map((field) => (
            <div key={field}>
              <dt>{field}</dt>
              <dd>{mineral[field]}</dd>
            </div>
          ))}
      </dl>

      <section className={styles.gallery}>
        {assets.map(([label, filename]) => (
          <a
            href={publicS3Asset(
              `webdata/minerals/${id}/${filename}`,
            )}
            key={filename}
            target="_blank"
            rel="noreferrer"
          >
            {/* S3 images vary by record and are intentionally rendered directly. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={publicS3Asset(
                `webdata/minerals/${id}/${filename}`,
              )}
              alt={`${mineral.Name} — ${label}`}
            />

            {label}
          </a>
        ))}
      </section>

      {mineral["Reflectance Spectrum VNIR-SWIR-MWIR"] === "1" ? (
        <MineralComparisonChart
          currentMineral={{
            ID: mineral.ID ?? "",
            Group: mineral.Group ?? "",
            Name: mineral.Name ?? "",
          }}
          minerals={minerals
            .filter((item) => item.ID && item.Group)
            .map((item) => ({
              ID: item.ID!,
              Group: item.Group!,
              Name: item.Name ?? "",
            }))}
        />
      ) : null}
    </main>
  );
}