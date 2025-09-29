// SEO meta tag utilities
import { City, Category, Listing, Article } from '../types';

export interface MetaData {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const SITE_NAME = 'DudeRanch Directory';
const SITE_URL = 'https://duderanch-directory.com'; // Replace with actual domain
const DEFAULT_OG_IMAGE = '/src/assets/hero-ranch.jpg';

export function getHomePageMeta(): MetaData {
  return {
    title: `${SITE_NAME} - Find the Perfect Dude Ranch for Your Western Adventure`,
    description: 'Discover authentic dude ranches, guest ranches, and Western experiences across the United States. Compare ratings, activities, and book your perfect ranch vacation.',
    canonical: SITE_URL,
    ogTitle: 'Find Your Perfect Dude Ranch Adventure',
    ogDescription: 'Discover authentic Western experiences at the best dude ranches across America.',
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getCityPageMeta(city: City, state: string): MetaData {
  const stateFormatted = formatStateName(state);
  return {
    title: `Best Dude Ranches in ${city.name}, ${stateFormatted} | ${SITE_NAME}`,
    description: `Discover top-rated dude ranches and Western experiences in ${city.name}, ${stateFormatted}. ${city.description || `Find authentic ranch vacations in ${city.name}.`}`,
    canonical: `${SITE_URL}/${state}/${city.slug}`,
    ogTitle: `Dude Ranches in ${city.name}, ${stateFormatted}`,
    ogDescription: city.description || `Find the perfect dude ranch experience in ${city.name}, ${stateFormatted}.`,
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getCityCategoryPageMeta(
  city: City, 
  category: Category, 
  state: string, 
  listingCount: number
): MetaData {
  const stateFormatted = formatStateName(state);
  return {
    title: `${category.name} in ${city.name}, ${stateFormatted} | ${SITE_NAME}`,
    description: `Find ${listingCount} ${category.name.toLowerCase()} in ${city.name}, ${stateFormatted}. ${category.description || `Compare top-rated ${category.name.toLowerCase()} for your Western adventure.`}`,
    canonical: `${SITE_URL}/${state}/${city.slug}/${category.slug}`,
    ogTitle: `${category.name} in ${city.name}`,
    ogDescription: `Discover ${category.name.toLowerCase()} in ${city.name}, ${stateFormatted}.`,
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getListingPageMeta(
  listing: Listing, 
  city: City, 
  category: Category, 
  state: string
): MetaData {
  const stateFormatted = formatStateName(state);
  const mainImage = listing.media?.[0]?.url || DEFAULT_OG_IMAGE;
  
  return {
    title: `${listing.name} - ${category.name} in ${city.name}, ${stateFormatted} | ${SITE_NAME}`,
    description: `${listing.shortDesc} Located in ${city.name}, ${stateFormatted}. Rating: ${listing.rating}/5. ${category.description || ''}`,
    canonical: `${SITE_URL}/${state}/${city.slug}/${category.slug}/${listing.slug}`,
    ogTitle: listing.name,
    ogDescription: listing.shortDesc,
    ogImage: mainImage,
  };
}

export function getGuidePageMeta(article: Article): MetaData {
  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.excerpt,
    canonical: `${SITE_URL}/guides/${article.slug}`,
    ogTitle: article.title,
    ogDescription: article.excerpt,
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getAdvertisePageMeta(): MetaData {
  return {
    title: `Advertise Your Dude Ranch | ${SITE_NAME}`,
    description: 'Promote your dude ranch or Western business to thousands of travelers looking for authentic ranch experiences. Simple, effective advertising solutions.',
    canonical: `${SITE_URL}/advertise`,
    ogTitle: 'Advertise Your Dude Ranch',
    ogDescription: 'Reach travelers looking for authentic Western experiences.',
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function formatStateName(stateSlug: string): string {
  return stateSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}