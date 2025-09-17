import {
  Gavel,
  GraduationCap,
  Landmark,
  ShieldUser,
  Stethoscope,
} from "lucide-react";
import { InstitutionCategory } from "../types";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";


export const iconColorClasses = {
  education: "text-teal-500",
  health: "text-green-500",
  administration: "text-amber-500",
  security: "text-rose-500",
  justice: "text-indigo-500",
};

export const iconComponents = {
  education: <GraduationCap className="h-5 w-5" />,
  health: <Stethoscope className="h-5 w-5" />,
  administration: <Landmark className="h-5 w-5" />,
  security: <ShieldUser className="h-5 w-5" />,
  justice: <Gavel className="h-5 w-5" />,
};

export const getSelectedIcon = (category: InstitutionCategory) => {
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
