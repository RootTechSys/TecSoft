export interface News {
  id: string;
  title: string;
  coverImage: string;
  briefDescription: string;
  content: string;
  authors: string[];
  theme: NewsTheme;
  publicationDate: Date;
  scheduledDate?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type NewsTheme = 
  | 'Inovação'
  | 'Eventos'
  | 'Parcerias'
  | 'Startup Ecosystem'
  | 'Mobile Development'
  | 'Academic Partnership'
  | 'Tecnologia'
  | 'Desenvolvimento'
  | 'Capacitação'
  | 'Networking';

export interface NewsFormData {
  title: string;
  coverImageUrl: string; // Link direto da imagem (obrigatório)
  briefDescription: string;
  content: string;
  authors: string[];
  theme: NewsTheme;
  scheduledDate?: Date;
  isPublished: boolean;
}

export interface NewsFilters {
  search: string;
  theme: NewsTheme | 'all';
  dateFrom?: Date;
  dateTo?: Date;
}


