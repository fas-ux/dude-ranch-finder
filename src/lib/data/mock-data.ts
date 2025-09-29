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
    address: 'Moose, WY 83012',
    shortDesc: 'Historic dude ranch in Grand Teton National Park offering authentic Western experiences.',
    longDescMd: `# Triangle X Ranch

Located in the heart of Grand Teton National Park, Triangle X Ranch has been welcoming guests since 1926. This historic dude ranch offers an authentic Western experience with comfortable accommodations, hearty meals, and unforgettable adventures.

## Activities
- Horseback riding through Grand Teton National Park
- Wildlife viewing and photography
- Fly fishing on the Snake River
- Evening entertainment and campfires

## Accommodations
Our rustic log cabins feature modern amenities while maintaining their historic charm.`,
    rating: 4.8,
    sourcesJson: { tripadvisor: 4.5, google: 4.9 },
    isFeatured: true,
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
    address: 'Moran, WY 83013',
    shortDesc: 'Family-owned guest ranch offering horseback adventures in the Greater Yellowstone Ecosystem.',
    longDescMd: `# Heart Six Ranch

A family-owned and operated guest ranch located just outside Grand Teton National Park. Heart Six Ranch offers authentic horseback adventures and comfortable accommodations in a pristine wilderness setting.

## What Makes Us Special
- Over 100 years of ranching heritage
- Access to pristine wilderness areas
- Professional wranglers and guides
- All-inclusive packages available`,
    rating: 4.7,
    sourcesJson: { tripadvisor: 4.6, google: 4.8 },
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pahaska Tepee Resort',
    slug: 'pahaska-tepee-resort',
    categoryId: '1',
    cityId: '2',
    phone: '(307) 527-7701',
    website: 'https://pahaska.com',
    address: '183 Yellowstone Hwy, Cody, WY 82414',
    shortDesc: 'Historic lodge and ranch at the East Gate of Yellowstone National Park.',
    longDescMd: `# Pahaska Tepee Resort

Built in 1904 by Buffalo Bill Cody, Pahaska Tepee Resort sits at the historic East Gate of Yellowstone National Park. This unique destination combines Western hospitality with wilderness adventure.

## Historic Significance
- Original hunting lodge of Buffalo Bill Cody
- Gateway to Yellowstone since 1904
- Listed on the National Register of Historic Places

## Modern Amenities
- Comfortable lodge rooms and cabins
- Restaurant featuring regional cuisine
- Gift shop with Western memorabilia`,
    rating: 4.5,
    sourcesJson: { tripadvisor: 4.3, google: 4.7 },
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Dixie Dude Ranch',
    slug: 'dixie-dude-ranch',
    categoryId: '1',
    cityId: '3',
    phone: '(830) 796-7771',
    website: 'https://dixieduderanch.com',
    address: 'Bandera, TX 78003',
    shortDesc: 'Texas Hill Country dude ranch offering authentic cowboy experiences since 1901.',
    longDescMd: `# Dixie Dude Ranch

Operating since 1901, Dixie Dude Ranch is one of the oldest continuously operating dude ranches in Texas. Located in the beautiful Hill Country, we offer authentic cowboy experiences with Southern hospitality.

## Ranch Activities
- Horseback riding through Hill Country trails
- Cattle work and ranch operations
- Swimming in the Medina River
- Evening entertainment and dancing

## Texas Traditions
- Authentic chuck wagon dinners
- Western entertainment and music
- Rodeo demonstrations
- Campfire stories and s'mores`,
    rating: 4.6,
    sourcesJson: { tripadvisor: 4.4, google: 4.8 },
    isFeatured: true,
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

**Experienced Riders**: Seek out ranches with more challenging terrain and advanced riding programs.

## Location Matters

- **Mountain Ranches**: Offer stunning scenery and cooler temperatures
- **Desert Ranches**: Provide unique landscapes and year-round riding weather
- **Working Ranches**: Give authentic cattle ranch experiences

## What's Included?

Most dude ranches offer all-inclusive packages that typically include:
- Accommodations
- All meals
- Horseback riding instruction
- Entertainment programs
- Some activities (fishing, hiking, etc.)`,
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
    url: '/src/assets/ranch-cabin.jpg',
    alt: 'Pahaska Tepee historic lodge',
    width: 640,
    height: 512,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    listingId: '4',
    url: '/src/assets/horseback-riding.jpg',
    alt: 'Dixie Dude Ranch horseback riding',
    width: 640,
    height: 512,
    createdAt: '2024-01-01T00:00:00Z',
  },
];