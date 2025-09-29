// Category data functions
import { Category } from '../types';
import { mockCategories } from './mock-data';

export async function getCategories(): Promise<Category[]> {
  return mockCategories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const found = mockCategories.find(c => c.slug === slug);
  return found || null;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const found = mockCategories.find(c => c.id === id);
  return found || null;
}