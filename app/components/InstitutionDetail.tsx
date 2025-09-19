"use client";

import React, { useEffect, useRef } from "react";
import { Institution } from "../types";
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  X,
  Building2,
} from "lucide-react";
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

  // Focus management
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <aside
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
        className="relative max-w-xl max-h-screen m-1 bg-background shadow-2xl rounded-t-2xl sm:rounded-2xl  border border-gray-100"
      >
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gradient-to-r border-b border-gray-200 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2
                id="institution-title"
                className="text-lg font-bold leading-tight mb-1"
              >
                {institution.label || institution.name}
              </h2>
              {institution.category_label && (
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium text-gray-600 bg-emerald/60 px-3 py-1 rounded-full">
                    {institution.category_label}
                  </span>
                </div>
              )}
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="shrink-0 p-2 rounded-full hover:bg-emerald-700 cursor-pointer transition-colors"
              aria-label="Fermer les détails de l'institution"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="overflow-y-auto h-full pb-25">
          <div className="p-5 space-y-2 overflow-visible">
            {/* Status & Condition */}
            <section className="flex flex-wrap gap-3">
              <StatusCard status={institution.status} />
              <ConditionBadge condition={institution.building_condition} />
            </section>

            {/* Description */}
            {institution.description && (
              <InfoCard title="À propos" icon={<Building2 />}>
                <p className="text-gray-700 leading-relaxed">
                  {institution.description}
                </p>
              </InfoCard>
            )}

            {/* Contact principal */}
            {(institution.phone_principal ||
              institution.email_principal ||
              institution.website) && (
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

            {/* Contacts supplémentaires */}
            {institution.contacts && institution.contacts.length > 0 && (
              <InfoCard title="Réseaux & Liens" icon={<Globe />}>
                <div className="space-y-3">
                  {institution.contacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      icon={<Globe size={18} />}
                      href={contact.value}
                      label={contact.value}
                      description="Lien associé"
                      external
                    />
                  ))}
                </div>
              </InfoCard>
            )}

            {/* Localisation */}
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

            {/* Frais */}
            {institution.education_fees &&
              institution.education_fees.length > 0 && (
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
    </aside>
  );
};

export default InstitutionDetail;
