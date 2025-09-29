import { supabase } from '@/integrations/supabase/client';
import { Listing } from '../types';

export async function getRanches(): Promise<Listing[]> {
  const { data, error } = await (supabase as any)
    .from('ranches')
    .select(`
      *,
      state:states(name, code, slug)
    `)
    .order('name');

  if (error) {
    console.error('Error fetching ranches:', error);
    return [];
  }

  // Transform database records to match Listing type
  return data.map(ranch => ({
    id: ranch.id,
    name: ranch.name,
    slug: ranch.slug,
    categoryId: '', // We'll populate this from ranch_categories
    cityId: ranch.state_id,
    phone: ranch.phone || undefined,
    website: ranch.website || undefined,
    email: ranch.email || undefined,
    address: ranch.address || '',
    shortDesc: ranch.description?.substring(0, 150) || '',
    longDescMd: ranch.description || '',
    rating: 4.5, // Default rating
    sourcesJson: {},
    isFeatured: ranch.is_featured || false,
    priceBand: ranch.price_band || undefined,
    amenities: ranch.amenities || [],
    lat: ranch.latitude || undefined,
    lng: ranch.longitude || undefined,
    postcode: ranch.postal_code || undefined,
    createdAt: ranch.created_at,
    updatedAt: ranch.updated_at,
    city: {
      id: ranch.state_id,
      name: ranch.city || '',
      state: ranch.state?.name || '',
      slug: ranch.state?.slug || '',
      lat: 0,
      lng: 0,
      population: 0,
      status: 'active' as const,
      createdAt: ranch.created_at
    }
  }));
}

export async function getRanchBySlug(slug: string): Promise<Listing | null> {
  const { data, error } = await (supabase as any)
    .from('ranches')
    .select(`
      *,
      state:states(name, code, slug)
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching ranch:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    categoryId: '',
    cityId: data.state_id,
    phone: data.phone || undefined,
    website: data.website || undefined,
    email: data.email || undefined,
    address: data.address || '',
    shortDesc: data.description?.substring(0, 150) || '',
    longDescMd: data.description || '',
    rating: 4.5,
    sourcesJson: {},
    isFeatured: data.is_featured || false,
    priceBand: data.price_band || undefined,
    amenities: data.amenities || [],
    lat: data.latitude || undefined,
    lng: data.longitude || undefined,
    postcode: data.postal_code || undefined,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    city: {
      id: data.state_id,
      name: data.city || '',
      state: data.state?.name || '',
      slug: data.state?.slug || '',
      lat: 0,
      lng: 0,
      population: 0,
      status: 'active' as const,
      createdAt: data.created_at
    }
  };
}

export async function getRanchesByState(stateSlug: string): Promise<Listing[]> {
  const { data, error } = await (supabase as any)
    .from('ranches')
    .select(`
      *,
      state:states!inner(name, code, slug)
    `)
    .eq('state.slug', stateSlug)
    .order('name');

  if (error) {
    console.error('Error fetching ranches by state:', error);
    return [];
  }

  return data.map(ranch => ({
    id: ranch.id,
    name: ranch.name,
    slug: ranch.slug,
    categoryId: '',
    cityId: ranch.state_id,
    phone: ranch.phone || undefined,
    website: ranch.website || undefined,
    email: ranch.email || undefined,
    address: ranch.address || '',
    shortDesc: ranch.description?.substring(0, 150) || '',
    longDescMd: ranch.description || '',
    rating: 4.5,
    sourcesJson: {},
    isFeatured: ranch.is_featured || false,
    priceBand: ranch.price_band || undefined,
    amenities: ranch.amenities || [],
    lat: ranch.latitude || undefined,
    lng: ranch.longitude || undefined,
    postcode: ranch.postal_code || undefined,
    createdAt: ranch.created_at,
    updatedAt: ranch.updated_at,
    city: {
      id: ranch.state_id,
      name: ranch.city || '',
      state: ranch.state?.name || '',
      slug: ranch.state?.slug || '',
      lat: 0,
      lng: 0,
      population: 0,
      status: 'active' as const,
      createdAt: ranch.created_at
    }
  }));
}

export async function getSimilarRanches(ranchId: string, stateId: string | null, limit = 3): Promise<Listing[]> {
  const { data, error } = await (supabase as any)
    .from('ranches')
    .select(`
      *,
      state:states(name, code, slug)
    `)
    .neq('id', ranchId);

  if (error) {
    console.error('Error fetching similar ranches:', error);
    return [];
  }

  const allRanches = data.map(ranch => ({
    id: ranch.id,
    name: ranch.name,
    slug: ranch.slug,
    categoryId: '',
    cityId: ranch.state_id,
    phone: ranch.phone || undefined,
    website: ranch.website || undefined,
    email: ranch.email || undefined,
    address: ranch.address || '',
    shortDesc: ranch.description?.substring(0, 150) || '',
    longDescMd: ranch.description || '',
    rating: 4.5,
    sourcesJson: {},
    isFeatured: ranch.is_featured || false,
    priceBand: ranch.price_band || undefined,
    amenities: ranch.amenities || [],
    lat: ranch.latitude || undefined,
    lng: ranch.longitude || undefined,
    postcode: ranch.postal_code || undefined,
    createdAt: ranch.created_at,
    updatedAt: ranch.updated_at,
    city: {
      id: ranch.state_id,
      name: ranch.city || '',
      state: ranch.state?.name || '',
      slug: ranch.state?.slug || '',
      lat: 0,
      lng: 0,
      population: 0,
      status: 'active' as const,
      createdAt: ranch.created_at
    }
  }));

  // Filter by same state first, then fallback to all ranches
  const sameStateRanches = allRanches.filter(r => r.cityId === stateId);
  const candidates = sameStateRanches.length >= limit ? sameStateRanches : allRanches;

  // Simple similarity based on matching amenities
  return candidates
    .slice(0, limit)
    .sort((a, b) => a.name.localeCompare(b.name));
}
