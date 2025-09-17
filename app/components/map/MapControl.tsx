import { useState } from "react";
import { useMap } from "react-leaflet";
import { MapControlButton } from "./MapControlButton";
import { LocateIcon, RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import L from "leaflet";
import "leaflet.markercluster";
import { defaultCenter, defaultZoom } from "@/app/utils/mapUtils";


function MapControl() {
  
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleResetView = () => map.flyTo(defaultCenter, defaultZoom);

  const handleLocate = () => {
    setIsLocating(true);
    map
      .locate()
      .on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
        // Supprimer les anciens cercles de localisation
        map.eachLayer((layer) => {
          if (
            layer instanceof L.Circle &&
            layer.options.className === "user-location"
          ) {
            map.removeLayer(layer);
          }
        });
        // Ajouter le nouveau cercle
        L.circle(e.latlng, {
          radius: e.accuracy / 2,
          weight: 1,
          color: "oklch(69.6% .17 162.48)",
          fillColor: "oklch(84.5% .143 164.978)",
          fillOpacity: 0.2,
          className: "user-location",
        }).addTo(map);
        setIsLocating(false);
      })
      .on("locationerror", function (e) {
        alert(
          "Impossible de vous localiser. Veuillez vérifier les autorisations de votre navigateur."
        );
        console.error(e.message);
        setIsLocating(false);
      });
  };


  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <MapControlButton
        onClick={handleZoomIn}
        title="Zoomer"
        ariaLabel="Zoomer"
        icon={ZoomInIcon}
      />

      <MapControlButton
        onClick={handleZoomOut}
        title="Dézoomer"
        ariaLabel="Dézoomer"
        icon={ZoomOutIcon}
      />

      <MapControlButton
        onClick={handleResetView}
        title="Vue d'ensemble"
        ariaLabel="Vue d'ensemble"
        icon={RotateCcwIcon}
      />

      <MapControlButton
        onClick={handleLocate}
        title="Ma position"
        ariaLabel="Trouver ma position"
        icon={LocateIcon}
        disabled={isLocating}
        isActive={isLocating}
      />
    </div>
  );


}

export default MapControl;