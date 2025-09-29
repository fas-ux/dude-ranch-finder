// Mock data for the dude ranch directory
import { City, Category, Listing, Article, MediaItem } from '../types';

export const mockCities: City[] = [
  {
    id: '1',
    name: 'Jackson',
    state: 'Wyoming',
    slug: 'jackson',
    lat: 43.4799,
    lng: -110.7624,
    population: 10760,
    status: 'active',
    description: 'Gateway to Grand Teton and Yellowstone National Parks, Jackson offers world-class dude ranch experiences.',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Cody',
    state: 'Wyoming',
    slug: 'cody',
    lat: 44.5263,
    lng: -109.0565,
    population: 10028,
    status: 'active',
    description: 'Known as the "Rodeo Capital of the World," Cody provides authentic Western experiences.',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Bandera',
    state: 'Texas',
    slug: 'bandera',
    lat: 29.7266,
    lng: -99.0736,
    population: 857,
    status: 'active',
    description: 'The "Cowboy Capital of the World" offers traditional Texas dude ranch experiences.',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Guest Ranches',
    slug: 'guest-ranches',
    description: 'Full-service dude ranches offering accommodations, meals, and activities',
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Working Ranches',
    slug: 'working-ranches',
    description: 'Authentic cattle ranches where guests participate in ranch operations',
    sortOrder: 2,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Horseback Riding',
    slug: 'horseback-riding',
    description: 'Guided trail rides and equestrian activities',
    sortOrder: 3,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Cattle Drives',
    slug: 'cattle-drives',
    description: 'Multi-day cattle herding adventures',
    sortOrder: 4,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockListings: Listing[] = [
  {
    id: '1',
    name: 'Triangle X Ranch',
    slug: 'triangle-x-ranch',
    categoryId: '1',
    cityId: '1',
    phone: '(307) 733-2183',
    website: 'https://trianglex.com',
    email: 'info@trianglex.com',
    address: 'Moose, WY 83012',
    shortDesc: 'Historic dude ranch in Grand Teton National Park offering authentic Western experiences.',
    longDescMd: `## Welcome to Triangle X Ranch

Located in the heart of Grand Teton National Park, Triangle X Ranch has been welcoming guests since 1926. This historic dude ranch offers an authentic Western experience with comfortable accommodations, hearty meals, and unforgettable adventures in one of America's most spectacular settings.

Our ranch sits on pristine wilderness land with breathtaking views of the Teton Range. As the only dude ranch operating within a national park, we offer unparalleled access to wildlife viewing and outdoor adventures that create memories lasting a lifetime.`,
    rating: 4.8,
    sourcesJson: { tripadvisor: 4.5, google: 4.9 },
    isFeatured: true,
    priceBand: '$$$',
    minStay: '4 nights',
    seasonality: {
      openMonths: ['May', 'June', 'July', 'August', 'September'],
      notes: 'Peak season July-August'
    },
    amenities: ['horseback riding', 'fly fishing', 'wildlife viewing', 'hiking trails', 'campfire programs', 'family activities'],
    uniqueHooks: ['only ranch in Grand Teton National Park', 'historic 1926 establishment', 'Snake River access'],
    lat: 43.6532,
    lng: -110.7002,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Heart Six Ranch',
    slug: 'heart-six-ranch',
    categoryId: '1',
    cityId: '1',
    phone: '(307) 543-2477',
    website: 'https://heartsix.com',
    email: 'info@heartsix.com',
    address: 'Moran, WY 83013',
    shortDesc: 'Family-owned guest ranch offering horseback adventures in the Greater Yellowstone Ecosystem.',
    longDescMd: `## Heart Six Ranch Experience

A family-owned and operated guest ranch located just outside Grand Teton National Park, Heart Six Ranch offers authentic horseback adventures and comfortable accommodations in a pristine wilderness setting. Our ranch combines over a century of ranching heritage with modern hospitality.

Experience the American West as it was meant to be - with vast open spaces, majestic mountain views, and the freedom that comes from horseback exploration of untouched wilderness areas.`,
    rating: 4.7,
    sourcesJson: { tripadvisor: 4.6, google: 4.8 },
    isFeatured: true,
    priceBand: '$$–$$$',
    minStay: '3 nights',
    seasonality: {
      openMonths: ['May', 'June', 'July', 'August', 'September', 'October'],
      notes: 'Extended season with fall programs'
    },
    amenities: ['horseback riding', 'pack trips', 'fishing', 'hiking', 'wildlife photography', 'evening entertainment'],
    uniqueHooks: ['100+ years ranching heritage', 'backcountry pack trips', 'professional wranglers'],
    lat: 43.8420,
    lng: -110.5298,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Dixie Dude Ranch',
    slug: 'dixie-dude-ranch',
    categoryId: '1',
    cityId: '3',
    phone: '(830) 796-7771',
    website: 'https://dixieduderanch.com',
    email: 'info@dixieduderanch.com',
    address: 'Bandera, TX 78003',
    shortDesc: 'Texas Hill Country dude ranch offering authentic cowboy experiences since 1901.',
    longDescMd: `## Dixie Dude Ranch

Operating since 1901, Dixie Dude Ranch is one of the oldest continuously operating dude ranches in Texas. Located in the beautiful Hill Country, we offer authentic cowboy experiences with genuine Southern hospitality and traditional Western values.

Experience real ranch life where guests participate in daily operations, enjoy trail rides through scenic countryside, and gather around evening campfires for storytelling and music that celebrates our rich ranching heritage.`,
    rating: 4.6,
    sourcesJson: { tripadvisor: 4.4, google: 4.8 },
    isFeatured: true,
    priceBand: '$$',
    minStay: '2 nights',
    seasonality: {
      openMonths: ['January', 'February', 'March', 'April', 'May', 'September', 'October', 'November', 'December'],
      notes: 'Closed June-August for summer break'
    },
    amenities: ['horseback riding', 'cattle work', 'river swimming', 'dance hall', 'chuck wagon dinners', 'kids programs'],
    uniqueHooks: ['operating since 1901', 'authentic cattle work', 'Texas Hill Country location'],
    lat: 29.7266,
    lng: -99.0736,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'choosing-your-first-dude-ranch',
    title: 'Choosing Your First Dude Ranch: A Complete Guide',
    excerpt: 'Everything you need to know to select the perfect dude ranch for your Western adventure.',
    bodyMd: `# Choosing Your First Dude Ranch: A Complete Guide

Planning your first dude ranch vacation can be exciting but overwhelming. With so many options available, how do you choose the right ranch for your family?

## Consider Your Experience Level

**Beginners**: Look for ranches that specialize in teaching riding skills and offer gentle horses.

**Experienced Riders**: Seek out ranches with more challenging terrain and advanced riding programs.`,
    cityId: null,
    categoryId: null,
    publishedAt: '2024-01-15T00:00:00Z',
  },
];

export const mockMedia: MediaItem[] = [
  {
    id: '1',
    listingId: '1',
    url: '/src/assets/hero-ranch.jpg',
    alt: 'Triangle X Ranch horses at sunset',
    width: 1920,
    height: 1080,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    listingId: '2',
    url: '/src/assets/ranch-landscape.jpg',
    alt: 'Heart Six Ranch mountain views',
    width: 800,
    height: 600,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    listingId: '3',
    url: '/src/assets/horseback-riding.jpg',
    alt: 'Dixie Dude Ranch horseback riding',
    width: 640,
    height: 512,
    createdAt: '2024-01-01T00:00:00Z',
  },
];