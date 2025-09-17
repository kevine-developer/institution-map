import  { useEffect } from 'react'
import { useMap } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSelectedIcon } from '@/app/utils/getSelectedIcon';

interface MarkersWithClustersProps {
  institutions: any[];
  onSelectItem: (institution: any) => void;
}

function MarkersWithClusters({ institutions, onSelectItem }: MarkersWithClustersProps) {
  const map = useMap();

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

      // Hover = affiche popup
      marker.on("mouseover", () => {
        marker
          .bindPopup(`<b>${inst.name}</b>`, {
            offset: L.point(0, -30),
            closeButton: false,
            autoClose: false,
          })
          .openPopup();
      });

      // Sortie de la souris = ferme popup
      marker.on("mouseout", () => {
        marker.closePopup();
      });

      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      if (map && markerClusterGroup) map.removeLayer(markerClusterGroup);
    };
  }, [institutions, map, onSelectItem]);

  return null;
}

export default MarkersWithClusters

