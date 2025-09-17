import { Institution, InstitutionCategory } from '../types';

// Configuration de l'API
const API_ROOT_URL = 'https://institut-back.onrender.com/api';
const API_INSTITUTIONS_URL = `${API_ROOT_URL}/institutions`;

// Types pour les réponses API
interface ApiResponse<T> {
  data: T;
  count?: number;
  limit?: number;
  offset?: number;
  message?: string;
}

interface InstitutionFilters {
  category?: string;
  subtype?: string;
  region?: string;
  district?: string;
  commune?: string;
  street?: string;
  name?: string;
  status?: 'ouvert' | 'ferme' | 'en rénovation' | 'en projet';
  min_capacity?: number;
  max_capacity?: number;
  limit?: number;
  offset?: number;
  sort?: string;
}

interface InstitutionStats {
  total_institutions: number;
  by_category: { category: string; count: number }[];
  by_region: { region: string; count: number }[];
  by_status: { status: string; count: number }[];
  average_capacity: number;
}

interface NearbyFilters {
  lat: number;
  lng: number;
  radius?: number;
}

// Utilitaire pour construire les query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });
  return searchParams.toString();
};

// Gestion centralisée des erreurs
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      // Si on ne peut pas parser la réponse JSON, on garde le message par défaut
    }
    throw new Error(errorMessage);
  }
};

const mapApiCategoryToLocal = (apiCategory?: string): InstitutionCategory => {
    if (!apiCategory) return 'administration';
    const categoryMapping: Record<string, InstitutionCategory> = {
        'EDUCATION': 'education', 'SANTE': 'health', 'HEALTH': 'health', 'ADMINISTRATION': 'administration',
        'SECURITE': 'security', 'SECURITY': 'security', 'JUSTICE': 'justice',
    };
    return categoryMapping[apiCategory.toUpperCase()] || 'administration';
};

// Transforme une institution de l'API (plate) vers le type de l'application (imbriqué)
const transformApiInstitution = (inst: any): Institution => {
  return {
    ...inst,
    address: {
      street: inst.street_name || undefined,
      commune: inst.commune_name || '',
      district: inst.district_name || '',
      region: inst.region_name || '',
      postalCode: inst.postal_code || undefined,
    },
    coordinates: {
      lat: inst.lat ? parseFloat(inst.lat) : 0,
      lng: inst.lng ? parseFloat(inst.lng) : 0,
    },
    type: {
      category: mapApiCategoryToLocal(inst.category_code),
      subtype: inst.subtype_label || '',
    },
  };
};

// =====================
// INSTITUTIONS CRUD
// =====================

/**
 * Récupère la liste des institutions avec filtres optionnels
 */
export const getInstitutions = async (filters: InstitutionFilters = {}): Promise<Institution[]> => {
  try {
    const queryParams = buildQueryParams(filters);
    const url = queryParams ? `${API_INSTITUTIONS_URL}?${queryParams}` : API_INSTITUTIONS_URL;
    
    const response = await fetch(url);
    await handleApiError(response);
    
    const data: ApiResponse<any[]> = await response.json();
    const rawInstitutions = data.data || [];
    return rawInstitutions.map(transformApiInstitution);
  } catch (error) {
    console.error("Could not fetch institutions:", error);
    return [];
  }
};

/**
 * Récupère une institution par son ID
 */
export const getInstitutionById = async (id: string): Promise<Institution | null> => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${id}`);
    await handleApiError(response);
    
    const data = await response.json();
    const rawInstitution = data.institution;
    return rawInstitution ? transformApiInstitution(rawInstitution) : null;
  } catch (error) {
    console.error(`Could not fetch institution ${id}:`, error);
    return null;
  }
};

/**
 * Crée une nouvelle institution
 */
export const createInstitution = async (institution: Omit<Institution, 'id'>): Promise<Institution | null> => {
  try {
    const response = await fetch(API_INSTITUTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(institution),
    });
    await handleApiError(response);
    
    const data: ApiResponse<Institution> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Could not create institution:", error);
    throw error;
  }
};

/**
 * Met à jour une institution
 */
export const updateInstitution = async (id: string, updates: Partial<Institution>): Promise<Institution | null> => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    await handleApiError(response);
    
    const data: ApiResponse<Institution> = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Could not update institution ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime une institution
 */
export const deleteInstitution = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
    return true;
  } catch (error) {
    console.error(`Could not delete institution ${id}:`, error);
    throw error;
  }
};

// =====================
// ENTITÉS DE RÉFÉRENCE
// =====================

/**
 * Récupère les catégories d'institutions
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_ROOT_URL}/categories`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch categories:", error);
    return [];
  }
};

/**
 * Récupère les sous-types d'institutions
 */
export const getSubtypes = async (categoryId?: string) => {
  try {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    const response = await fetch(`${API_ROOT_URL}/subtypes${params}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch subtypes:", error);
    return [];
  }
};

/**
 * Récupère les types de contact
 */
export const getContactTypes = async () => {
  try {
    const response = await fetch(`${API_ROOT_URL}/contact-types`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch contact types:", error);
    return [];
  }
};

/**
 * Récupère les types de personnel
 */
export const getStaffTypes = async () => {
  try {
    const response = await fetch(`${API_ROOT_URL}/staff-types`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch staff types:", error);
    return [];
  }
};

/**
 * Récupère les types d'utilitaires
 */
export const getUtilityTypes = async () => {
  try {
    const response = await fetch(`${API_ROOT_URL}/utility-types`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch utility types:", error);
    return [];
  }
};

// =====================
// DONNÉES GÉOGRAPHIQUES
// =====================

/**
 * Récupère les régions
 */
export const getRegions = async () => {
  try {
    const response = await fetch(`${API_ROOT_URL}/regions`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch regions:", error);
    return [];
  }
};

/**
 * Récupère les districts d'une région
 */
export const getDistricts = async (regionId?: string) => {
  try {
    const params = regionId ? `?region_id=${regionId}` : '';
    const response = await fetch(`${API_ROOT_URL}/districts${params}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch districts:", error);
    return [];
  }
};

/**
 * Récupère les communes d'un district
 */
export const getCommunes = async (districtId?: string) => {
  try {
    const params = districtId ? `?district_id=${districtId}` : '';
    const response = await fetch(`${API_ROOT_URL}/communes${params}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch communes:", error);
    return [];
  }
};

/**
 * Récupère les rues d'une commune
 */
export const getStreets = async (communeId?: string) => {
  try {
    const params = communeId ? `?commune_id=${communeId}` : '';
    const response = await fetch(`${API_ROOT_URL}/streets${params}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch streets:", error);
    return [];
  }
};

// =====================
// RELATIONS INSTITUTION
// =====================

/**
 * Récupère les contacts d'une institution
 */
export const getInstitutionContacts = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/contacts`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch contacts:", error);
    return [];
  }
};

/**
 * Ajoute un contact à une institution
 */
export const addInstitutionContact = async (institutionId: string, contact: { contact_type_id: string; value: string }) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not add contact:", error);
    throw error;
  }
};

/**
 * Récupère les horaires d'ouverture d'une institution
 */
export const getInstitutionOpeningHours = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/opening-hours`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch opening hours:", error);
    return [];
  }
};

/**
 * Ajoute un horaire d'ouverture à une institution
 */
export const addInstitutionOpeningHour = async (
  institutionId: string, 
  openingHour: { day_of_week: number; open_time: string; close_time: string }
) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/opening-hours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openingHour),
    });
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not add opening hour:", error);
    throw error;
  }
};

/**
 * Met à jour un horaire d'ouverture
 */
export const updateInstitutionOpeningHour = async (
  institutionId: string,
  openingHourId: string,
  updates: Partial<{ day_of_week: number; open_time: string; close_time: string }>
) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/opening-hours/${openingHourId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not update opening hour:", error);
    throw error;
  }
};

/**
 * Supprime un horaire d'ouverture
 */
export const deleteInstitutionOpeningHour = async (institutionId: string, openingHourId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/opening-hours/${openingHourId}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
    return true;
  } catch (error) {
    console.error("Could not delete opening hour:", error);
    throw error;
  }
};

/**
 * Récupère le personnel d'une institution
 */
export const getInstitutionStaff = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/staff`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch staff:", error);
    return [];
  }
};

/**
 * Récupère les services d'une institution
 */
export const getInstitutionServices = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/services`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch services:", error);
    return [];
  }
};

/**
 * Récupère les photos d'une institution
 */
export const getInstitutionPhotos = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/photos`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch photos:", error);
    return [];
  }
};

/**
 * Récupère les frais d'éducation d'une institution
 */
export const getInstitutionEducationFees = async (institutionId: string) => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}/${institutionId}/education_fees`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch education fees:", error);
    return [];
  }
};

// =====================
// STATISTIQUES
// =====================

/**
 * Récupère les statistiques générales
 */
export const getInstitutionStats = async (): Promise<InstitutionStats> => {
  try {
    const response = await fetch(`${API_ROOT_URL}/stats`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch stats:", error);
    return {
      total_institutions: 0,
      by_category: [],
      by_region: [],
      by_status: [],
      average_capacity: 0
    };
  }
};

/**
 * Recherche d'institutions à proximité
 */
export const getNearbyInstitutions = async (filters: NearbyFilters): Promise<Institution[]> => {
  try {
    const queryParams = buildQueryParams(filters);
    const response = await fetch(`${API_INSTITUTIONS_URL}/nearby?${queryParams}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Could not fetch nearby institutions:", error);
    return [];
  }
};

// =====================
// FONCTIONS UTILITAIRES
// =====================

/**
 * Recherche d'institutions avec terme de recherche
 */
export const searchInstitutions = async (searchTerm: string): Promise<Institution[]> => {
  return getInstitutions({ name: searchTerm, limit: 50 });
};

/**
 * Récupère les institutions par catégorie
 */
export const getInstitutionsByCategory = async (categoryCode: string): Promise<Institution[]> => {
  return getInstitutions({ category: categoryCode });
};

/**
 * Récupère les institutions par région
 */
export const getInstitutionsByRegion = async (regionCode: string): Promise<Institution[]> => {
  return getInstitutions({ region: regionCode });
};

/**
 * Vérifie si l'API est accessible
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_INSTITUTIONS_URL}?limit=1`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Export par défaut de la fonction principale pour compatibilité
export default getInstitutions;