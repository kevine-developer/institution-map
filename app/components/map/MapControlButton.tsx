"use client";
import { ComponentType } from "react";

type MapControlButtonProps = {
  onClick: () => void;
  title: string;
  ariaLabel: string;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
  isActive?: boolean; 
  className?: string;
};

export const MapControlButton = ({
  onClick,
  title,
  ariaLabel,
  icon: Icon,
  disabled = false,
  isActive = false,
  className = "",
}: MapControlButtonProps) => {
  return (
    <button
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed  " : "cursor-pointer w-10 h-10 p-0 flex items-center justify-center bg-background backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-md shadow-md hover:bg-emerald-500 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      }`}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
    </button>
  );
};
