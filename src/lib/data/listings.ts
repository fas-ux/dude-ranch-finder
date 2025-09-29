// Listing data functions
import { Listing, City, Category } from '../types';
import { mockListings, mockCities, mockCategories, mockMedia } from './mock-data';

interface GetListingsOptions {
  featuredFirst?: boolean;
  limit?: number;
}

export async function getListingsByCityAndCategory(
  cityId: string, 
  categoryId: string, 
  opts: GetListingsOptions = {}
): Promise<Listing[]> {
  let listings = mockListings.filter(l => 
    l.cityId === cityId && l.categoryId === categoryId
  );

  // Populate related data
  listings = await populateListings(listings);

  if (opts.featuredFirst) {
    listings.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  } else {
    listings.sort((a, b) => b.rating - a.rating);
  }

  if (opts.limit) {
    listings = listings.slice(0, opts.limit);
  }

  return listings;
}

export async function getListingsByCity(cityId: string, opts: GetListingsOptions = {}): Promise<Listing[]> {
  let listings = mockListings.filter(l => l.cityId === cityId);
  
  // Populate related data
  listings = await populateListings(listings);

  if (opts.featuredFirst) {
    listings.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  }

  if (opts.limit) {
    listings = listings.slice(0, opts.limit);
  }

  return listings;
}

export async function getListingBySlugs(
  state: string, 
  city: string, 
  category: string, 
  slug: string
): Promise<Listing | null> {
  // Find city and category first
  const normalizedState = state.toLowerCase().replace('-', ' ');
  const foundCity = mockCities.find(c => 
    c.slug === city && 
    c.state.toLowerCase() === normalizedState
  );
  
  const foundCategory = mockCategories.find(c => c.slug === category);
  
  if (!foundCity || !foundCategory) return null;

  const listing = mockListings.find(l => 
    l.slug === slug && 
    l.cityId === foundCity.id && 
    l.categoryId === foundCategory.id
  );

  if (!listing) return null;

  // Populate related data
  const populated = await populateListings([listing]);
  return populated[0] || null;
}

export async function getTopListingsForCity(cityId: string, limit: number): Promise<Listing[]> {
  let listings = mockListings.filter(l => l.cityId === cityId);
  
  // Sort by featured first, then rating
  listings.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.rating - a.rating;
  });

  listings = listings.slice(0, limit);
  
  // Populate related data
  return await populateListings(listings);
}

export async function getFeaturedListings(limit?: number): Promise<Listing[]> {
  let listings = mockListings.filter(l => l.isFeatured);
  listings.sort((a, b) => b.rating - a.rating);
  
  if (limit) {
    listings = listings.slice(0, limit);
  }

  return await populateListings(listings);
}

async function populateListings(listings: Listing[]): Promise<Listing[]> {
  return listings.map(listing => ({
    ...listing,
    city: mockCities.find(c => c.id === listing.cityId),
    category: mockCategories.find(c => c.id === listing.categoryId),
    media: mockMedia.filter(m => m.listingId === listing.id),
  }));
}