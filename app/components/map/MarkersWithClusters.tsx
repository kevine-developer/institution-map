"use client";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSelectedIcon } from "@/app/utils/getSelectedIcon";

interface MarkersWithClustersProps {
  institutions: any[];
  onSelectItem: (institution: any) => void;
}

interface PopupState {
  institution: any;
  position: { x: number; y: number };
  visible: boolean;
}

function MarkersWithClusters({
  institutions,
  onSelectItem,
}: MarkersWithClustersProps) {
  const map = useMap();
  const [popup, setPopup] = useState<PopupState>({
    institution: null,
    position: { x: 0, y: 0 },
    visible: false,
  });

  useEffect(() => {
    if (!("markerClusterGroup" in L)) return;

    const markerClusterGroup: any = (L as any).markerClusterGroup({
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        const html = `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ring-2 text-sm font-semibold bg-emerald-500 text-white ring-white ">
            ${count}
          </div>
        `;
        return L.divIcon({
          html,
          className: "leaflet-marker-cluster-custom",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      },
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    // Ajout des marqueurs
    institutions.forEach((inst) => {
      const lat = Number(inst.coordinates?.lat ?? inst.lat);
      const lng = Number(inst.coordinates?.lng ?? inst.lng);
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      const marker = L.marker([lat, lng], {
        icon: getSelectedIcon(inst.type.category),
      });

      // Clique = sélection
      marker.on("click", () => onSelectItem(inst));

      // Hover = affiche popup personnalisé
      marker.on("mouseover", (e) => {
        const containerPoint = map.latLngToContainerPoint([lat, lng]);
        setPopup({
          institution: inst,
          position: {
            x: containerPoint.x,
            y: containerPoint.y - 40, // Offset vers le haut
          },
          visible: true,
        });
      });

      // Sortie de la souris = ferme popup
      marker.on("mouseout", () => {
        setPopup(prev => ({ ...prev, visible: false }));
      });

      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    // Gestion du déplacement de la carte
    const handleMapMove = () => {
      if (popup.visible && popup.institution) {
        const lat = Number(popup.institution.coordinates?.lat ?? popup.institution.lat);
        const lng = Number(popup.institution.coordinates?.lng ?? popup.institution.lng);
        const containerPoint = map.latLngToContainerPoint([lat, lng]);
        setPopup(prev => ({
          ...prev,
          position: {
            x: containerPoint.x,
            y: containerPoint.y - 40,
          },
        }));
      }
    };

    map.on("move", handleMapMove);
    map.on("zoom", handleMapMove);

    return () => {
      if (map && markerClusterGroup) {
        map.removeLayer(markerClusterGroup);
        map.off("move", handleMapMove);
        map.off("zoom", handleMapMove);
      }
    };
  }, [institutions, map, onSelectItem, popup.visible, popup.institution]);

  return (
    <>
      {/* Popup personnalisé */}
      {popup.visible && popup.institution && (
        <div
          className="absolute z-[1000] pointer-events-none"
          style={{
            left: popup.position.x,
            top: popup.position.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 w-52 relative">
            {/* Petite flèche pointant vers le marqueur */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
            
            <h3 className="font-semibold text-slate-800 text-sm mb-1">
              {popup.institution.name}
            </h3>
            <p className="text-xs text-slate-500 leading-snug">

            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MarkersWithClusters;