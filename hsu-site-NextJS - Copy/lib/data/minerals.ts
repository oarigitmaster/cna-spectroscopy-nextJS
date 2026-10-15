import "server-only";

import type { DataRow } from "@/lib/data/types";
import { fetchPublicS3 } from "@/lib/storage/public-s3";

function parseCsv(text: string): DataRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);

  const [headers = [], ...data] = rows;
  return data.map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header.trim(), values[index]?.trim() ?? ""]),
    ),
  );
}

export async function getMinerals(): Promise<DataRow[]> {
  const response = await fetchPublicS3("masterfiles/mineral_database.csv");
  return parseCsv(await response.text());
}

export async function getMineral(id: string) {
  const minerals = await getMinerals();
  return minerals.find(
    (mineral) => mineral.ID?.toLowerCase() === id.toLowerCase(),
  );
}
