"use client";

import { useEffect, useState } from "react";

type Props = {
  coreId: string;
};

const S3_BASE =
  "https://cna-webfiles.s3.amazonaws.com/webdata/drillcore";

function addBaseHref(html: string, url: string) {
  const baseHref = url.slice(0, url.lastIndexOf("/") + 1);
  const baseTag = `<base href="${baseHref}">`;
  const headTag = /<head\b[^>]*>/i;

  return headTag.test(html)
    ? html.replace(headTag, (head) => `${head}${baseTag}`)
    : `${baseTag}${html}`;
}

export default function DrillcoreMineralogyChart({
  coreId,
}: Props) {
  const [chartDocument, setChartDocument] =
    useState<string | null>(null);
  const [checking, setChecking] =
    useState(true);
  const [frameLoaded, setFrameLoaded] =
    useState(false);

  const encodedId = encodeURIComponent(coreId);
  const url =
    `${S3_BASE}/${encodedId}/` +
    `${encodedId}_DATA.html`;

  useEffect(() => {
    const controller = new AbortController();

    async function checkChart() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (response.ok) {
          const html = await response.text();

          if (!controller.signal.aborted) {
            setChartDocument(addBaseHref(html, url));
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(
            `Unable to load mineralogy chart for ${coreId}:`,
            error,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setChecking(false);
        }
      }
    }

    void checkChart();

    return () => controller.abort();
  }, [coreId, url]);

  if (!checking && chartDocument === null) {
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

      {checking || !frameLoaded ? (
        <p className="drillcore-chart-loading">
          Loading mineralogy chart...
        </p>
      ) : null}

      {chartDocument !== null ? (
        <div className="drillcore-mineralogy-frame">
          <iframe
            className="drillcore-mineralogy-chart"
            srcDoc={chartDocument}
            title={`Hyperspectral mineralogy chart for drillcore ${coreId}`}
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            onLoad={() => setFrameLoaded(true)}
          />
        </div>
      ) : null}
    </section>
  );
}
