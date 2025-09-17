"use client"
import React from "react";
import { Institution } from "../types";
import { X } from "lucide-react";

interface InstitutionDetailProps {
  institution: Institution;
  onClose: () => void;
}

const InstitutionDetail: React.FC<InstitutionDetailProps> = ({ institution, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-xl flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {institution.label || institution.name}
            </h2>
            {institution.category_label && (
              <p className="text-sm text-slate-500">{institution.category_label}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
           <X  />
          </button>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto p-4 space-y-4">
       
        </main>
      </div>
    </div>
  );
};

export default InstitutionDetail;
