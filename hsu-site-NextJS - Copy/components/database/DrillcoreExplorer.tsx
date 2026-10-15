"use client";

import { useMemo, useState } from "react";

import type { DrillcoreMapRecord } from "@/lib/data/drillcores";

import DrillcoreMap from "./DrillcoreMap";
import DrillcorePreviewCard from "./DrillcorePreviewCard";

import styles from "./DrillcoreExplorer.module.css";

type DrillcoreExplorerProps = {
  drillcores: DrillcoreMapRecord[];
};

export default function DrillcoreExplorer({
  drillcores,
}: DrillcoreExplorerProps) {
  const [query, setQuery] = useState("");
  const [library, setLibrary] = useState("All");

  const [hoveredCore, setHoveredCore] =
    useState<DrillcoreMapRecord | null>(null);

  const [selectedCore, setSelectedCore] =
    useState<DrillcoreMapRecord | null>(null);

  const libraries = useMemo(() => {
    return Array.from(
      new Set(
        drillcores
          .map((core) => core.library)
          .filter(Boolean),
      ),
    ).sort();
  }, [drillcores]);

  const filteredDrillcores = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return drillcores.filter((core) => {
      const matchesLibrary =
        library === "All" || core.library === library;

      const matchesQuery =
        !normalizedQuery ||
        [
          core.id,
          core.property,
          core.commodity,
          core.library,
          core.scanType,
          core.year,
        ].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesLibrary && matchesQuery;
    });
  }, [drillcores, library, query]);

  const previewCore = selectedCore ?? hoveredCore;

  return (
    <section className={styles.explorer}>
      <div className={styles.controls}>
        <label className={styles.search}>
          <span>Search collection</span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Core ID, property, commodity…"
          />
        </label>

        <label>
          <span>Collection</span>

          <select
            value={library}
            onChange={(event) => {
              setLibrary(event.target.value);
              setSelectedCore(null);
            }}
          >
            <option value="All">All collections</option>

            {libraries.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <p className={styles.count}>
          {filteredDrillcores.length.toLocaleString()} drillcores
        </p>
      </div>

      <div className={styles.explorerLayout}>
        <DrillcoreMap
          drillcores={filteredDrillcores}
          selectedCore={selectedCore}
          onHover={setHoveredCore}
          onSelect={setSelectedCore}
        />

        <DrillcorePreviewCard core={previewCore} />
      </div>
    </section>
  );
}