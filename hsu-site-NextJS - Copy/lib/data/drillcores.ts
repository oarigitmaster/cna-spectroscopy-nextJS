import "server-only";

import XlsxPopulate from "xlsx-populate";

import type { DataRow, StoredImage } from "@/lib/data/types";
import {
  fetchPublicS3,
  listPublicS3Keys,
  publicS3Asset,
} from "@/lib/storage/public-s3";

export type DrillcoreMapRecord = {
  id: string;
  library: string;
  property: string;
  commodity: string;
  year: string;
  length: string;
  scanType: string;
  latitude: number;
  longitude: number;
  previewUrl: string;
};

export async function getDrillcores(): Promise<DataRow[]> {
  const response = await fetchPublicS3("masterfiles/ddh_database.xlsx");
  const workbook = await XlsxPopulate.fromDataAsync(
    Buffer.from(await response.arrayBuffer()),
  );
  const rows = workbook.sheet(0).usedRange().value() as (
    | string
    | number
    | null
  )[][];

  const [columnNames = [], visibility = [], ...data] = rows;
  const visibleColumns = columnNames.map(
    (name, index) => Boolean(name) && String(visibility[index]) !== "0",
  );

  return data
    .map((values) =>
      Object.fromEntries(
        columnNames.flatMap((name, index) =>
          visibleColumns[index]
            ? [[String(name), String(values[index] ?? "").trim()]]
            : [],
        ),
      ),
    )
    .filter((row: DataRow) => row.Co_No);
}

export async function getDrillcoreMapRecords(): Promise<
  DrillcoreMapRecord[]
> {
  const drillcores = await getDrillcores();

  return drillcores
    .map((core) => {
      const latitude = Number.parseFloat(core.Lat_NAD27);
      const longitude = Number.parseFloat(core.Long_NAD27);

      return {
        id: core.Co_No,
        library: core.Library || "",
        property: core.Property || "",
        commodity: core.Commodity_1 || "",
        year: core.Year_Drill || "",
        length: core.Length_m || "",
        scanType: core.Scan_Type || "",
        latitude,
        longitude,
        previewUrl: publicS3Asset(
          `webdata/drillcore/${core.Co_No}/preview.jpg`,
        ),
      };
    })
    .filter(
      (core) =>
        core.id &&
        Number.isFinite(core.latitude) &&
        Number.isFinite(core.longitude),
    );
}

export async function getDrillcore(id: string) {
  const drillcores = await getDrillcores();
  return drillcores.find(
    (core) => core.Co_No?.trim().toLowerCase() === id.trim().toLowerCase(),
  );
}

export async function getDrillcoreImages(id: string): Promise<StoredImage[]> {
  const encodedId = id.trim();
  let lowercaseFolder: string[] = [];
  let capitalizedFolder: string[] = [];

  try {
    [lowercaseFolder, capitalizedFolder] = await Promise.all([
      listPublicS3Keys(`webdata/drillcore/${encodedId}/composites/`),
      listPublicS3Keys(`webdata/drillcore/${encodedId}/Composite/`),
    ]);
  } catch (error) {
    console.error(`Unable to list drillcore images for ${encodedId}:`, error);
  }

  return Array.from(new Set([...lowercaseFolder, ...capitalizedFolder]))
    .filter((key) => /\.(avif|gif|jpe?g|png|webp)$/i.test(key))
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((key) => ({
      key,
      url: publicS3Asset(key),
      name: key.split("/").pop() ?? "Drillcore image",
    }));
}
