import React, { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { institutionCategories } from "@/app/utils/institutionCategories";

interface LegendCategorieProps {
  onCategoryClick: (category: string) => void;
}


function LegendCategorie({ onCategoryClick }: LegendCategorieProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg shadow-md w-">
      {/* Header avec bouton collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-800 dark:text-slate-200"
      >
        Catégories
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Contenu qui peut se collapse */}
      {isOpen && (
        <div className="mt-2 space-y-1">
          {Object.entries(institutionCategories).map(([category, data]) => {
            const Icon = data.icon;
            return (
              <button
                key={category}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 capitalize"
                 onClick={() => onCategoryClick(category)}  
              >
                <div
                  className={`p-1 bg-white rounded-full shadow-sm ${data.colorClass}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span>{data.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LegendCategorie;
