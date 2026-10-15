"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  coreId: string;
};

const S3_BASE =
  "https://cna-webfiles.s3.amazonaws.com/webdata/drillcore";

export default function DrillcoreMineralogyChart({
  coreId,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [loading, setLoading] =
    useState(true);

  const [available, setAvailable] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadChart() {
      try {
        setLoading(true);

        const url =
          `${S3_BASE}/${encodeURIComponent(coreId)}/` +
          `${encodeURIComponent(coreId)}_DATA.html`;

        const response = await fetch(url);

        if (!response.ok) {
          if (!cancelled) {
            setAvailable(false);
            setLoading(false);
          }

          return;
        }

        const html = await response.text();

        if (
          cancelled ||
          !containerRef.current
        ) {
          return;
        }

        const container =
          containerRef.current;

        container.innerHTML = html;

        /*
         * Setting innerHTML does not execute
         * script tags, so recreate them.
         *
         * This mirrors the behavior of the
         * original Node/EJS drillcore page.
         */
        const scripts =
          container.querySelectorAll("script");

        scripts.forEach((oldScript) => {
          const newScript =
            document.createElement("script");

          Array.from(
            oldScript.attributes,
          ).forEach((attribute) => {
            newScript.setAttribute(
              attribute.name,
              attribute.value,
            );
          });

          if (oldScript.src) {
            newScript.src =
              oldScript.src;
          } else {
            newScript.textContent =
              oldScript.textContent;
          }

          oldScript.replaceWith(
            newScript,
          );
        });

        if (!cancelled) {
          setAvailable(true);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          `Unable to load mineralogy chart for ${coreId}:`,
          error,
        );

        if (!cancelled) {
          setAvailable(false);
          setLoading(false);
        }
      }
    }

    void loadChart();

    return () => {
      cancelled = true;

      if (containerRef.current) {
        containerRef.current.innerHTML =
          "";
      }
    };
  }, [coreId]);

  if (!available) {
    return null;
  }

  return (
    <section className="drillcore-mineralogy">
      <div className="drillcore-mineralogy-header">
        <p className="eyebrow">
          Mineralogy
        </p>

        <h2>
          Hyperspectral mineralogy
        </h2>

        <p>
          Interactive mineralogical results
          for drillcore {coreId}.
        </p>
      </div>

      {loading ? (
        <p className="drillcore-chart-loading">
          Loading mineralogy chart...
        </p>
      ) : null}

      <div
        ref={containerRef}
        className="drillcore-mineralogy-chart"
      />
    </section>
  );
}