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
        className="relative w-full max-w-xl h-full max-h-screen m-1 bg-background shadow-2xl rounded-t-2xl sm:rounded-2xl border border-gray-100 flex flex-col"
      >
        {/* Header */}
        <header className="flex-shrink-0 bg-gradient-to-r border-b border-gray-200 px-6 py-4">
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
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-2">
            {/* Status & Condition */}
            <section className="flex flex-wrap gap-3">
              <StatusCard status={institution.status} />
              <ConditionBadge condition={institution.building_condition} />
            </section>

            {/* Description */}
            {institution.description && (
              <InfoCard title="À propos" >
                <p className="text-gray-700 leading-relaxed">
                  {institution.description}
                </p>
              </InfoCard>
            )}

            {/* Informations générales */}
            <InfoCard title="Informations générales">
              <div className="grid grid-cols-2 gap-4">
                {institution.established && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Établi en</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{institution.established}</dd>
                  </div>
                )}
                {institution.capacity && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Capacité</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{institution.capacity} personnes</dd>
                  </div>
                )}
                {institution.last_renovation && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Dernière rénovation</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{institution.last_renovation}</dd>
                  </div>
                )}
                {institution.accreditation && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Accréditation</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{institution.accreditation}</dd>
                  </div>
                )}
              </div>
            </InfoCard>

            {/* Contact principal */}
            {(institution.phone_principal ||
              institution.email_principal ||
              institution.website) && (
              <InfoCard title="Contact">
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
              <InfoCard title="Réseaux & Liens" >
                <div className="space-y-1">
                  {institution.contacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      icon={<Globe size={18} />}
                      href={contact.value}
                      label={contact.value}
                      description=""
                      external
                    />
                  ))}
                </div>
              </InfoCard>
            )}

            {/* Services */}
            {institution.services && institution.services.length > 0 && (
              <InfoCard title="Services proposés">
                <div className="space-y-2">
                  {institution.services.map((service, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.name }</h4>
                        {service.description && (
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </InfoCard>
            )}

            {/* Localisation */}
            <InfoCard title="Localisation">
              <div className="space-y-3">
                
                {/* Lien Google Maps */}
                {institution.google_maps_url && (
                  <ContactItem
                    icon={<MapPin size={18} />}
                    href={institution.google_maps_url}
                    label="Voir sur Google Maps"
                    description="Ouvrir dans Google Maps"
                    external
                  />
                )}

                {/* Informations administratives */}
                {(institution.region_name || institution.district_name || institution.commune_name) && (
                  <div className="pt-2 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Division administrative</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {institution.region_name && <div>Région: {institution.region_name}</div>}
                      {institution.district_name && <div>District: {institution.district_name}</div>}
                      {institution.commune_name && <div>Commune: {institution.commune_name}</div>}
                      {institution.street_name && <div>Rue: {institution.street_name}</div>}
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>

            {/* Frais */}
            {institution.education_fees &&
              institution.education_fees.length > 0 && (
                <InfoCard title="Frais de scolarité" >
                  <div className="space-y-3">
                    {institution.education_fees.map((fee, index) => (
                      <FeeCard key={index} fee={fee} />
                    ))}
                  </div>
                </InfoCard>
              )}

            {/* Historique des mises à jour */}
            {institution.last_update && (
              <InfoCard title="Dernière mise à jour">
                <div className="text-sm text-gray-600">
                  {new Date(institution.last_update).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </InfoCard>
            )}

            {/* Padding bottom pour éviter que le contenu soit coupé */}
            <div className="h-6"></div>
          </div>
        </main>
      </div>
    </aside>
  );
};

export default InstitutionDetail;