// City data functions
import { City } from '../types';
import { mockCities } from './mock-data';

export async function getCities(): Promise<City[]> {
  // In production, this would query Supabase
  return mockCities.filter(city => city.status === 'active');
}

export async function getCityBySlug(state: string, city: string): Promise<City | null> {
  // Normalize state name for matching
  const normalizedState = state.toLowerCase().replace('-', ' ');
  
  const found = mockCities.find(c => 
    c.slug === city && 
    c.state.toLowerCase() === normalizedState &&
    c.status === 'active'
  );
  
  return found || null;
}

export async function getCityById(id: string): Promise<City | null> {
  const found = mockCities.find(c => c.id === id && c.status === 'active');
  return found || null;
}

export function getStateSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-');
}

export function getStateName(stateSlug: string): string {
  return stateSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}