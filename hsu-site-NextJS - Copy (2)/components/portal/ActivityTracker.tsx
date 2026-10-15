"use client";

import { useEffect } from "react";

type ActivityTrackerProps = {
  action:
    | "dataset.view"
    | "source.view";

  datasetID?: string;
  sourceID?: string;
};

export function ActivityTracker({
  action,
  datasetID,
  sourceID,
}: ActivityTrackerProps) {
  useEffect(() => {
    const key = [
      action,
      datasetID ?? "",
      sourceID ?? "",
    ].join(":");

    /*
     * React development mode can mount a
     * component twice. Avoid recording the
     * same view twice within a few seconds.
     */
    const storageKey =
      `activity:${key}`;

    const previous =
      sessionStorage.getItem(storageKey);

    const now = Date.now();

    if (previous) {
      const previousTime =
        Number(previous);

      if (
        Number.isFinite(previousTime) &&
        now - previousTime < 3000
      ) {
        return;
      }
    }

    sessionStorage.setItem(
      storageKey,
      String(now),
    );

    void fetch("/api/v1/portal-events", {
        method: "POST",

        headers: {
            "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
            action,
            datasetID,
            sourceID,
        }),
        }).catch((error) => {
      console.error(
        "Unable to record activity:",
        error,
      );
    });
  }, [
    action,
    datasetID,
    sourceID,
  ]);

  return null;
}