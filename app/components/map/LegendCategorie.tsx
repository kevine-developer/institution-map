"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { institutionCategories } from "@/app/utils/institutionCategories";

interface LegendCategorieProps {
  onCategoryClick: (category: string) => void;
}

function LegendCategorie({ onCategoryClick }: LegendCategorieProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-[500] p-3 mb-2 w-40 rounded-lg shadow-lg bg-background cursor-pointer select-none">
      {/* Header avec bouton collapse */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-semibold "
      >
        Catégories
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>

      {/* Contenu qui peut se collapse */}
      {isOpen && (
        <div className="">
          {Object.entries(institutionCategories).map(([category, data]) => {
            const Icon = data.icon;
            return (
              <button
                key={category}
                className="flex items-center gap-2 text-sm w-full hover:bg-accent/50 p-1 cursor-pointer rounded-md hover:bg-emerald-500  transition-colors"
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
