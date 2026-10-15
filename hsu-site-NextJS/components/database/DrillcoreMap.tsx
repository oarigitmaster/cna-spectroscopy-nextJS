"use client";

import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import type { DrillcoreMapRecord } from "@/lib/data/drillcores";

import styles from "./DrillcoreExplorer.module.css";

type DrillcoreMapProps = {
  drillcores: DrillcoreMapRecord[];
  selectedCore: DrillcoreMapRecord | null;
  onHover: (core: DrillcoreMapRecord | null) => void;
  onSelect: (core: DrillcoreMapRecord) => void;
};

export default function DrillcoreMap({
  drillcores,
  selectedCore,
  onHover,
  onSelect,
}: DrillcoreMapProps) {
  return (
    <div className={styles.map}>
      <MapContainer
        center={[49, -55]}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {drillcores.map((core) => {
          const selected = selectedCore?.id === core.id;

          return (
            <CircleMarker
              key={core.id}
              center={[core.latitude, core.longitude]}
              radius={selected ? 8 : 5}
              pathOptions={{
                color: selected ? "#18332c" : "#b54c1f",
                fillColor: selected ? "#18332c" : "#b54c1f",
                fillOpacity: selected ? 1 : 0.8,
                weight: selected ? 3 : 1,
              }}
              eventHandlers={{
                mouseover: () => onHover(core),
                mouseout: () => onHover(null),
                click: () => onSelect(core),
              }}
            >
              <Tooltip>
                <strong>{core.id}</strong>
                {core.property && (
                  <>
                    <br />
                    {core.property}
                  </>
                )}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}