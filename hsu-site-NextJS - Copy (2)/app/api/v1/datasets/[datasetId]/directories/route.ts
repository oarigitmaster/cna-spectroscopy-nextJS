import { NextResponse } from "next/server";

import { getCAIRDatasets } from "@/lib/cair/config";
import { listCAIRDirectory } from "@/lib/storage/cair-storage";

type RouteContext = {
  params: Promise<{
    datasetId: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext,
) {
  const { datasetId } = await context.params;

  const { searchParams } = new URL(request.url);

  const relativePath =
    searchParams.get("path")?.trim() ?? "";

  const datasets = getCAIRDatasets();

  const dataset = datasets.find(
    (item) => item.id === datasetId,
  );

  if (!dataset) {
    return NextResponse.json(
      { error: "Dataset not found." },
      { status: 404 },
    );
  }

  if (!dataset.browseRoot) {
    return NextResponse.json(
      {
        error:
          "This dataset does not have a browse root configured.",
      },
      { status: 400 },
    );
  }

  try {
    const entries = await listCAIRDirectory(
      dataset.browseRoot,
      relativePath,
    );

    // Dataset-specific directories that should not be
    // exposed through the public browser.
    const hiddenDirectories = new Set(
      dataset.hiddenDirectories ?? [],
    );

    const directories = entries
      .filter(
        (entry) =>
          entry.type === "directory" &&
          !hiddenDirectories.has(entry.name),
      )
      .map((entry) => ({
        name: entry.name,
        path: entry.path,
      }));

    return NextResponse.json({
      dataset: {
        id: dataset.id,
        title: dataset.title,
      },
      path: relativePath,
      directories,
    });
  } catch (error) {
    console.error(
      `Unable to list directories for dataset "${datasetId}".`,
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to list dataset directories.",
      },
      { status: 500 },
    );
  }
}