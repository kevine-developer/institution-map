export type Theme = 'light' | 'dark';

export type InstitutionCategory = 'education' | 'health' | 'administration' | 'security' | 'justice';

export interface Filters {
  searchTerm: string;
  type: InstitutionCategory | 'ALL';
  region: string;
  district: string;
}

export interface Institution {
  id: string;
  type: {
    category: InstitutionCategory;
    subtype: string
  };
  name: string;
  label?: string;
  description?: string;
  coordinates: { lat: number; lng: number };
  address: {
    street?: string;
    commune: string;
    district: string;
    region: string;
    postalCode?: string;
  };
  contact?: {
    phones?: string[];
    emails?: string[];
    website?: string;
    socials?: Record<string, string>;
  };
  services?: Array<{
    id: string;
    service_code?: string;
    name: string;
    description?: string;
  }>;
  photos?: Array<{
    id: string;
    url: string;
    caption?: string;
    credit?: string;
  }>;
  metadata?: {
    established?: number;
    capacity?: number;
    lastRenovation?: number;
    accreditation?: string;
  };

  // Properties from ApiInstitution
  category_code?: string;
  category_label?: string;
  subtype_code?: string;
  subtype_label?: string;
  region_name?: string;
  district_name?: string;
  commune_name?: string;
  street_name?: string;
  established?: number;
  capacity?: number;
  last_renovation?: number;
  accreditation?: string;
  phone_principal?: string;
  email_principal?: string;
  website?: string;
  status?: string;
  building_condition?: string;
  lat?: number;
  lng?: number;
  contacts?: Array<{
    id: string;
    contact_type_code: string;
    contact_type_label: string;
    value: string;
  }>;
  opening_hours?: Array<{
    id: string;
    day_of_week: number;
    day_name?: string;
    open_time?: string;
    close_time?: string;
  }>;
  education_fees?: Array<{
    id: string;
    level: string;
    amount: number;
    currency: string;
    description?: string;
  }>;
  staff?: Array<{
    id: string;
    staff_code: string;
    staff_label: string;
    quantity: number;
  }>;
  utilities?: Array<{
    id: string;
    utility_code: string;
    utility_label: string;
    availability: 'oui' | 'non' | 'partiel';
  }>;
  ratios?: Array<{
    id: string;
    ratio_type: string;
    value: number;
    year: number;
  }>;
}


export interface InstitutionDataset {
  institutions: Institution[];
}