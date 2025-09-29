// Article data functions
import { Article } from '../types';
import { mockArticles, mockCities, mockCategories } from './mock-data';

export async function getGuideSlugs(): Promise<string[]> {
  return mockArticles.map(article => article.slug);
}

export async function getGuideBySlug(slug: string): Promise<Article | null> {
  const article = mockArticles.find(a => a.slug === slug);
  
  if (!article) return null;

  // Populate related data
  return {
    ...article,
    city: article.cityId ? mockCities.find(c => c.id === article.cityId) : undefined,
    category: article.categoryId ? mockCategories.find(c => c.id === article.categoryId) : undefined,
  };
}

export async function getGuides(limit?: number): Promise<Article[]> {
  let articles = [...mockArticles];
  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  if (limit) {
    articles = articles.slice(0, limit);
  }

  // Populate related data
  return articles.map(article => ({
    ...article,
    city: article.cityId ? mockCities.find(c => c.id === article.cityId) : undefined,
    category: article.categoryId ? mockCategories.find(c => c.id === article.categoryId) : undefined,
  }));
}