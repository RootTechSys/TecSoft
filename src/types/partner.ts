export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerFormData {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
}

export interface PartnerFilters {
  search: string;
  isActive: boolean | null;
}

