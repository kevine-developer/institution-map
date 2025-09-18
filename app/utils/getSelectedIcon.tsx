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
  //  ÉDUCATION - Bleu : savoir, confiance, stabilité
  education: "text-blue-600",
  
  //  SANTÉ - Rouge médical : urgence, soins, croix rouge
  sante: "text-red-500",
  
  //  ADMINISTRATION - Violet : autorité, gouvernance, dignité
  administration: "text-purple-600",
  
  //  SÉCURITÉ - Bleu marine : protection, ordre, force
  security: "text-blue-800",

  //  JUSTICE - Indigo foncé : équité, impartialité, sagesse
  justice: "text-indigo-700",

  //  FINANCES - Vert : argent, économie, croissance
  finances: "text-green-600",
  
  //  TRANSPORT - Orange : mouvement, dynamisme, infrastructure
  transport: "text-orange-500",
  
  //  AGRICULTURE - Vert olive : nature, terre, cultivation
  agriculture: "text-lime-600",
  
  //  INDUSTRIE - Gris acier : industrie, technologie, modernité
  industrie: "text-slate-600",
  
  //  CULTURE - Rose : créativité, art, expression
  culture: "text-pink-500",
  
  //  SPORT - Cyan : énergie, mouvement, vitalité
  sport: "text-cyan-500",
  
  //  ENVIRONNEMENT - Vert émeraude : écologie, nature, durabilité
  environnement: "text-emerald-600"
};

export const iconComponents = {
  education: <GraduationCap className="h-5 w-5" />,
  sante: <Stethoscope className="h-5 w-5" />,
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
