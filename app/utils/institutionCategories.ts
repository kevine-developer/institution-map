import {
  GraduationCap,
  Stethoscope,
  Landmark,
  Shield,
  Gavel,
} from "lucide-react";
import { InstitutionCategory } from "@/app/types";

export const institutionCategories: Record<
  InstitutionCategory,
  {
    label: string;
    icon: React.ComponentType<any>;
    colorClass: string;
  }
> = {
  education: {
    label: "Éducation",
    icon: GraduationCap,
    colorClass: "text-emerald-600",
  },
  health: {
    label: "Santé",
    icon: Stethoscope,
    colorClass: "text-red-500",
  },
  administration: {
    label: "Administration",
    icon: Landmark,
    colorClass: "text-blue-500",
  },
  security: {
    label: "Sécurité",
    icon: Shield,
    colorClass: "text-yellow-500",
  },
  justice: {
    label: "Justice",
    icon: Gavel,
    colorClass: "text-purple-500",
  },
};
/** import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Institution, InstitutionCategory } from "../types";
import MapControl from "./map/MapControl";
import "leaflet.markercluster";
import LegendCategorie from "./map/LegendCategorie";
import { ChangeView } from "./map/ChangeView";
import { tileLayers } from "../utils/mapUtils";
import {
  Gavel,
  GraduationCap,
  Hospital,
  Landmark,
  Scale,
  School,
  ShieldUser,
  Stethoscope,
} from "lucide-react";
import ReactDOMServer from "react-dom/server";

declare module "leaflet" {
  function markerClusterGroup(options?: any): L.LayerGroup;
}

const defaultCenter: [number, number] = [-18.9137, 47.5214];
const defaultZoom = 6;


const iconColorClasses = {
  education: "text-teal-500",
  health: "text-green-500",
  administration: "text-amber-500",
  security: "text-rose-500",
  justice: "text-indigo-500",
};

const iconComponents = {
  education: <GraduationCap className="h-5 w-5" />,
  health: <Stethoscope className="h-5 w-5" />,
  administration: <Landmark className="h-5 w-5" />,
  security: <ShieldUser className="h-5 w-5" />,
  justice: <Gavel className="h-5 w-5" />,
};

const getSelectedIcon = (category: InstitutionCategory) => {
  const iconComponent = iconComponents[category];
  const colorClass = iconColorClasses[category];

  const iconHtml = ReactDOMServer.renderToString(
    <div
      className={`p-1 bg-white rounded-full shadow-xl  flex w-8 h-8 items-center justify-center border ${colorClass}`}
    >
      {iconComponent}
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-leaflet-icon-selected",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

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
const MarkersWithClusters: React.FC<{
  institutions: Institution[];
  onSelectItem: (institution: Institution) => void;
}> = ({ institutions, onSelectItem }) => {
  const map = useMap();

  useEffect(() => {
    // sécurité : vérifie que le plugin est dispo
    if (!("markerClusterGroup" in L)) return;

    const markerClusterGroup: any = (L as any).markerClusterGroup({
      // iconCreateFunction permet d'afficher le nombre et d'utiliser Tailwind
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        const html = `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ring-2 text-sm font-semibold bg-emerald-500 text-white ring-white ">
            ${count}
          </div>
        `;
        return L.divIcon({
          html,
          className: "leaflet-marker-cluster-custom", // utile si tu veux cibler avec du CSS supplémentaire
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      },
      // Optionnel : zoomToBoundsOnClick, spiderfyOnMaxZoom, etc.
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    // ajouter tous les marqueurs (non sélectionnés)
    institutions.forEach((inst) => {
      const lat = Number(inst.coordinates?.lat ?? inst.lat);
      const lng = Number(inst.coordinates?.lng ?? inst.lng);
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      const marker = L.marker([lat, lng], {
        icon: getSelectedIcon(inst.type.category),
      });

      marker.on("click", () => onSelectItem(inst));
      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      if (map && markerClusterGroup) map.removeLayer(markerClusterGroup);
    };
  }, [institutions, map, onSelectItem]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  institutions,
  selectedInstitution,
  onSelectItem,
}) => {
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
  const currentTileLayer = tileLayers.light;

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
          key="light"
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

        <ChangeView center={center} zoom={zoom} />
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
*/