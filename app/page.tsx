"use client";
import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import { Institution } from "./types";
import InstitutionDetail from "./components/InstitutionDetail";
import { getInstitutions, checkApiHealth } from "./services/institutionService";
import Reload from "./components/ui/Reload";
import Loading from "./components/ui/Loading";

const App: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiHealthy, setIsApiHealthy] = useState(true);

  // Vérification API
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await checkApiHealth();
      setIsApiHealthy(healthy);
      if (!healthy) {
        setError(
          "L'API n'est pas accessible. Vérifiez votre connexion internet."
        );
      }
    };
    checkHealth();
  }, []);

  useEffect(() => {
    const loadInstitutions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error("Failed to load institutions:", error);
        setError(
          "Erreur lors du chargement des institutions. Veuillez réessayer."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isApiHealthy) {
      loadInstitutions();
    }
  }, [isApiHealthy]);

  const handleSelectItem = (institution: Institution) => {
    setSelectedInstitution(institution);
    
  };

  const handleCloseDetail = () => {
    setSelectedInstitution(null);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getInstitutions();
      setInstitutions(data);
    } catch (error) {
      console.error("Failed to refresh institutions:", error);
      setError("Erreur lors du rechargement. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="overflow-auto flex flex-grow   relative bg-slate-50 dark:bg-slate-900">
      {isLoading && <Loading institutions={institutions} />}

      {error && !isLoading && (
        <Reload
          error={error}
          setError={setError}
          handleRefresh={handleRefresh}
        />
      )}

      <section className="flex-grow flex  overflow-auto">
        <div className="md:col-span-2 lg:col-span-3 h-full z-0 w-full flex-shrink-0">
          <MapComponent
            institutions={institutions}
            selectedInstitution={selectedInstitution}
            onSelectItem={handleSelectItem}
          />
        </div>
      </section>

      {selectedInstitution && (
        <InstitutionDetail
          institution={selectedInstitution as any}
          onClose={handleCloseDetail}
        />
      )}
    </main>
  );
};

export default App;
