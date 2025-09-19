"use client";

import React, { useEffect, useRef } from "react";
import { Institution } from "../types";
import { Globe, Mail, MapPin, Phone, X, CheckCircle, AlertCircle, Building2 } from "lucide-react";
import ConditionBadge from "./ui/ConditionBadge";
import StatusCard from "./ui/StatusCard";
import FeeCard from "./ui/FeeCard";
import ContactItem from "./ui/ContactItem";
import InfoCard from "./ui/InfoCard";

interface InstitutionDetailProps {
  institution: Institution;
  onClose: () => void;
}

const InstitutionDetail: React.FC<InstitutionDetailProps> = ({
  institution,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management pour l'accessibilité
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end bg-black/20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="institution-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label="Fermer la fenêtre"
      />

      {/* Panel */}
      <div 
        ref={panelRef}
        className="relative w-full max-w-2xl h-[95vh] sm:h-[90vh] bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden border border-gray-100"
      >
        {/* Header avec gradient subtil */}
        <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 
                id="institution-title"
                className="text-2xl font-bold text-gray-900 leading-tight mb-1"
              >
                {institution.label || institution.name}
              </h2>
              {institution.category_label && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                    {institution.category_label}
                  </span>
                </div>
              )}
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="shrink-0 p-2 rounded-full hover:bg-white/80 focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Fermer les détails de l'institution"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Content avec scroll optimisé */}
        <main className="overflow-y-auto h-full pb-25">
          <div className="p-5 space-y-2">
            
            {/* Status et condition - Cards horizontales */}
            <section className="flex flex-wrap gap-3">
              <StatusCard status={institution.status} />
              <ConditionBadge condition={institution.building_condition} />
            </section>

            {/* Description */}
            {institution.description && (
              <InfoCard title="À propos" icon={<Building2 />}>
                <p className="text-gray-700 leading-relaxed">{institution.description}</p>
              </InfoCard>
            )}

            {/* Contact Information */}
            {(institution.phone_principal || institution.email_principal || institution.website) && (
              <InfoCard title="Contact" icon={<Phone />}>
                <div className="space-y-3">
                  {institution.phone_principal && (
                    <ContactItem
                      icon={<Phone size={18} />}
                      href={`tel:${institution.phone_principal}`}
                      label={institution.phone_principal}
                      description="Téléphone principal"
                    />
                  )}
                  {institution.email_principal && (
                    <ContactItem
                      icon={<Mail size={18} />}
                      href={`mailto:${institution.email_principal}`}
                      label={institution.email_principal}
                      description="Adresse e-mail"
                    />
                  )}
                  {institution.website && (
                    <ContactItem
                      icon={<Globe size={18} />}
                      href={institution.website}
                      label="Visiter le site web"
                      description="Site web officiel"
                      external
                    />
                  )}
                </div>
              </InfoCard>
            )}

            {/* Location */}
            {institution.google_maps_url && (
              <InfoCard title="Localisation" icon={<MapPin />}>
                <ContactItem
                  icon={<MapPin size={18} />}
                  href={institution.google_maps_url}
                  label="Voir sur Google Maps"
                  description="Ouvrir dans Google Maps"
                  external
                />
              </InfoCard>
            )}

            {/* Fees */}
            {institution.education_fees && institution.education_fees.length > 0 && (
              <InfoCard title="Frais de scolarité" icon={<Building2 />}>
                <div className="space-y-3">
                  {institution.education_fees.map((fee, index) => (
                    <FeeCard key={index} fee={fee} />
                  ))}
                </div>
              </InfoCard>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};










export default InstitutionDetail;