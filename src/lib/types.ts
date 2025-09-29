// Data types for the dude ranch directory

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  lat: number;
  lng: number;
  population: number;
  status: 'active' | 'inactive';
  description?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  createdAt: string;
}

export interface Listing {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  cityId: string;
  phone?: string;
  website?: string;
  email?: string;
  address: string;
  shortDesc: string;
  longDescMd: string;
  rating: number;
  sourcesJson: Record<string, any>;
  isFeatured: boolean;
  // Enhanced ranch details
  priceBand?: string; // $, $$–$$$, unknown
  minStay?: string;
  seasonality?: {
    openMonths: string[];
    notes?: string;
  };
  amenities?: string[];
  uniqueHooks?: string[];
  lat?: number;
  lng?: number;
  postcode?: string;
  createdAt: string;
  updatedAt: string;
  // Populated joins
  category?: Category;
  city?: City;
  media?: MediaItem[];
}

export interface MediaItem {
  id: string;
  listingId: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  bodyMd: string;
  cityId?: string;
  categoryId?: string;
  publishedAt: string;
  // Populated joins
  city?: City;
  category?: Category;
}

export interface AdSlot {
  id: string;
  key: string;
  location: string;
  cityId?: string;
  categoryId?: string;
  listingId?: string;
  startAt: string;
  endAt: string;
}

export interface Lead {
  id: string;
  listingId?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  createdAt: string;
}