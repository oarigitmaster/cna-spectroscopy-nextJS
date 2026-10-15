"use client";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartDataset,
} from "chart.js";

import { Scatter } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  zoomPlugin,
);

type MineralRecord = {
  ID: string;
  Group: string;
  Name?: string;
};

type SpectrumPoint = {
  x: number;
  y: number;
};

type Props = {
  currentMineral: MineralRecord;
  minerals: MineralRecord[];
};

const S3_BASE =
  "https://cna-webfiles.s3.amazonaws.com/webdata/minerals";

async function loadSpectrum(
  mineralId: string,
): Promise<SpectrumPoint[]> {
  const url =
    `${S3_BASE}/${mineralId}/` +
    `${mineralId}_Reflectance_spectrum_VNIR-SWIR-MWIR.csv`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Unable to load spectrum for ${mineralId}`,
    );
  }

  const csv = await response.text();

  const rows = csv
    .split(/\r?\n/)
    .slice(2)
    .map((line) => line.split(","))
    .filter((row) => row.length >= 2);

  return rows
    .map(([x, y]) => ({
      x: Number.parseFloat(x),
      y: Number.parseFloat(y),
    }))
    .filter(
      (point) =>
        Number.isFinite(point.x) &&
        Number.isFinite(point.y),
    );
}

function comparisonColor(index: number) {
  const hue = (index * 67) % 360;

  return `hsl(${hue} 65% 45%)`;
}

export function MineralComparisonChart({
  currentMineral,
  minerals,
}: Props) {
  const chartRef = useRef<any>(null);

  const [datasets, setDatasets] = useState<
    ChartDataset<"scatter", SpectrumPoint[]>[]
  >([]);

  const [selected, setSelected] =
    useState<string[]>([]);

  const [loadingIds, setLoadingIds] =
    useState<string[]>([]);

  const [search, setSearch] =
    useState("");

  const [showResults, setShowResults] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentMineral() {
      try {
        const points = await loadSpectrum(
          currentMineral.ID,
        );

        if (cancelled) return;

        setDatasets([
          {
            label: currentMineral.ID,
            data: points,
            borderColor: "#111111",
            backgroundColor: "#111111",
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
            pointHitRadius: 5,
          },
        ]);

        setSelected([]);
      } catch (error) {
        console.error(
          "Unable to load current mineral spectrum:",
          error,
        );
      }
    }

    void loadCurrentMineral();

    return () => {
      cancelled = true;
    };
  }, [currentMineral.ID]);

  const searchResults = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return minerals
      .filter((mineral) => {
        if (
          mineral.ID ===
          currentMineral.ID
        ) {
          return false;
        }

        if (
          selected.includes(mineral.ID)
        ) {
          return false;
        }

        return (
          mineral.ID
            .toLowerCase()
            .includes(query) ||
          (mineral.Name
            ?.toLowerCase()
            .includes(query) ??
            false) ||
          mineral.Group
            .toLowerCase()
            .includes(query)
        );
      })
      .slice(0, 12);
  }, [
    search,
    minerals,
    selected,
    currentMineral.ID,
  ]);

  async function toggleMineral(
    mineralId: string,
    checked: boolean,
  ) {
    if (checked) {
      if (
        selected.includes(mineralId) ||
        loadingIds.includes(mineralId)
      ) {
        return;
      }

      setLoadingIds((previous) => [
        ...previous,
        mineralId,
      ]);

      try {
        const points =
          await loadSpectrum(mineralId);

        const color =
          comparisonColor(
            selected.length + 1,
          );

        setDatasets((previous) => [
          ...previous,
          {
            label: mineralId,
            data: points,
            borderColor: color,
            backgroundColor: color,
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
            pointHitRadius: 5,
          },
        ]);

        setSelected((previous) => [
          ...previous,
          mineralId,
        ]);

        chartRef.current?.resetZoom();
      } catch (error) {
        console.error(
          `Unable to load comparison spectrum for ${mineralId}:`,
          error,
        );
      } finally {
        setLoadingIds((previous) =>
          previous.filter(
            (id) => id !== mineralId,
          ),
        );
      }

      return;
    }

    setDatasets((previous) =>
      previous.filter(
        (dataset) =>
          dataset.label !== mineralId,
      ),
    );

    setSelected((previous) =>
      previous.filter(
        (id) => id !== mineralId,
      ),
    );

    chartRef.current?.resetZoom();
  }

  return (
    <section className="mineral-chart-section">
      <div className="mineral-chart-header">
        <div>
          <p className="eyebrow">
            Reflectance comparison
          </p>

          <h2>
            VNIR–SWIR–MWIR Reflectance Spectrum
          </h2>

          <p>
            Compare {currentMineral.ID} with
            other mineral samples.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            chartRef.current?.resetZoom()
          }
        >
          Reset zoom
        </button>
      </div>

      <div className="mineral-chart">
        <Scatter
          ref={chartRef}
          data={{ datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            parsing: false,

            interaction: {
              mode: "nearest",
              intersect: false,
            },

            scales: {
              x: {
                type: "linear",
                title: {
                  display: true,
                  text: "Wavelength (nm)",
                },
                grid: {
                  display: true,
                },
              },

              y: {
                title: {
                  display: true,
                  text: "Reflectance",
                },
                grid: {
                  display: true,
                },
              },
            },

            plugins: {
              legend: {
                display: true,
                position: "top",
              },

              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },

                zoom: {
                  mode: "xy",

                  drag: {
                    enabled: true,
                  },

                  wheel: {
                    enabled: false,
                  },
                },
              },
            },
          }}
        />
      </div>

      <div className="mineral-comparison-picker">
        <div className="comparison-controls-header">
          <div>
            <h3>Compare samples</h3>

            <p>
              Search for another mineral sample
              to overlay its reflectance spectrum.
            </p>
          </div>
        </div>

        <div className="sample-search">
          <label
            htmlFor="mineral-comparison-search"
            className="sample-search-label"
          >
            Add sample
          </label>

          <div className="sample-search-container">
            <input
              id="mineral-comparison-search"
              type="search"
              value={search}
              placeholder="Search sample ID, mineral or group..."
              autoComplete="off"
              onFocus={() =>
                setShowResults(true)
              }
              onChange={(event) => {
                setSearch(
                  event.target.value,
                );

                setShowResults(true);
              }}
            />

            {showResults &&
            search.trim() ? (
              <div className="sample-search-results">
                {searchResults.length ? (
                  searchResults.map(
                    (mineral) => {
                      const loading =
                        loadingIds.includes(
                          mineral.ID,
                        );

                      return (
                        <button
                          key={mineral.ID}
                          type="button"
                          disabled={loading}
                          className="sample-search-result"
                          onClick={async () => {
                            await toggleMineral(
                              mineral.ID,
                              true,
                            );

                            setSearch("");
                            setShowResults(
                              false,
                            );
                          }}
                        >
                          <span className="sample-result-main">
                            <strong>
                              {mineral.ID}
                            </strong>

                            {mineral.Name ? (
                              <span>
                                {
                                  mineral.Name
                                }
                              </span>
                            ) : null}
                          </span>

                          <span className="sample-result-group">
                            {loading
                              ? "Loading..."
                              : mineral.Group}
                          </span>
                        </button>
                      );
                    },
                  )
                ) : (
                  <div className="sample-search-empty">
                    No matching samples
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="selected-samples">
          <span className="selected-samples-label">
            Displayed samples
          </span>

          <div className="sample-chips">
            <span className="sample-chip sample-chip-current">
              <span>
                {currentMineral.ID}
              </span>

              <small>Current</small>
            </span>

            {selected.map((id) => {
              const mineral =
                minerals.find(
                  (item) =>
                    item.ID === id,
                );

              return (
                <span
                  className="sample-chip"
                  key={id}
                >
                  <span>{id}</span>

                  {mineral?.Name ? (
                    <small>
                      {mineral.Name}
                    </small>
                  ) : null}

                  <button
                    type="button"
                    aria-label={`Remove ${id}`}
                    onClick={() =>
                      toggleMineral(
                        id,
                        false,
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}