"use client";
import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Institution} from "../types";
import MapControl from "./map/MapControl";
import "leaflet.markercluster";
import LegendCategorie from "./map/LegendCategorie";
import { ChangeView } from "./map/ChangeView";
import { defaultCenter, defaultZoom, tileLayers } from "../utils/mapUtils";

import { getSelectedIcon } from "../utils/getSelectedIcon";
import MarkersWithClusters from "./map/MarkersWithClusters";
import { useTheme } from "../utils/ThemeProvider";

declare module "leaflet" {
  function markerClusterGroup(options?: any): L.LayerGroup;
}



const SelectedMarker: React.FC<{ institution: Institution }> = ({
  institution,
}) => {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker(
      [institution.coordinates.lat, institution.coordinates.lng],
      {
        icon: getSelectedIcon(institution.type.category),
        zIndexOffset: 1000,
      }
    );
    marker.addTo(map);

    return () => {
      map.removeLayer(marker);
    };
  }, [institution, map]);

  return null;
};

interface MapComponentProps {
  institutions: Institution[];
  selectedInstitution: Institution | null;
  onSelectItem: (institution: Institution) => void;
}



const MapComponent: React.FC<MapComponentProps> = ({
  institutions,
  selectedInstitution,
  onSelectItem,
}) => {


const { theme, resolvedTheme } = useTheme();

  const validInstitutions = useMemo(
    () =>
      institutions.filter(
        (inst) =>
          inst.coordinates?.lat &&
          inst.coordinates?.lng &&
          !isNaN(Number(inst.coordinates.lat)) &&
          !isNaN(Number(inst.coordinates.lng))
      ),
    [institutions]
  );

  const unselectedInstitutions = useMemo(
    () =>
      validInstitutions.filter((inst) => inst.id !== selectedInstitution?.id),
    [validInstitutions, selectedInstitution]
  );

  const center: [number, number] =
    selectedInstitution?.coordinates?.lat &&
    selectedInstitution?.coordinates?.lng
      ? [
          parseFloat(String(selectedInstitution.coordinates.lat)),
          parseFloat(String(selectedInstitution.coordinates.lng)),
        ]
      : defaultCenter;

  const zoom = selectedInstitution ? 14 : defaultZoom;
  const currentTileLayer = tileLayers[theme === "dark" || resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          key={theme === "dark" || resolvedTheme === "dark" ? "dark" : "light"}
          attribution={currentTileLayer.attribution}
          url={currentTileLayer.url}
        />

        <MarkersWithClusters
          institutions={unselectedInstitutions}
          onSelectItem={onSelectItem}
        />

        {selectedInstitution && (
          <SelectedMarker institution={selectedInstitution} />
        )}

       {/*  <ChangeView center={center} zoom={zoom} /> */}
        <LegendCategorie
          onCategoryClick={(category) => {
            console.log("Catégorie cliquée :", category);
          }}
        />
        <MapControl />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
