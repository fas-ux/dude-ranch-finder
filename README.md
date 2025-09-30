# Dude Ranch Retreats - Next.js SSG/ISR Site

A high-performance, SEO-optimized website for discovering America's best dude ranches. Built with Next.js 14, App Router, and static site generation (SSG) with incremental static regeneration (ISR).

## Features

- **Server-Side Rendering (SSR)** - All content visible without JavaScript
- **Static Site Generation (SSG)** - Pre-built pages for optimal performance
- **Incremental Static Regeneration (ISR)** - 24-hour revalidation for fresh content
- **Complete SEO Implementation** - Meta tags, JSON-LD, sitemap, robots.txt
- **Responsive Design** - Mobile-first, beautiful UI
- **Performance Optimized** - Next.js Image optimization, prefetching

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Homepage (SSG)
│   ├── ranches/
│   │   ├── page.tsx       # Ranch listing (SSG)
│   │   ├── [slug]/page.tsx # Ranch details (SSG/ISR)
│   │   └── page/[page]/page.tsx # Pagination (SSG)
│   ├── sitemap.ts         # XML sitemap generation
│   ├── robots.ts          # Robots.txt
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
├── content/
│   └── ranches.json       # Ranch data source
└── lib/
    ├── seo.ts            # SEO helpers
    └── schema.ts         # JSON-LD schema generators
```

## Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Adding New Ranches

To add a new ranch to the site:

1. Open `content/ranches.json`
2. Add a new ranch object with all required fields:

```json
{
  "slug": "your-ranch-name",
  "name": "Your Ranch Name",
  "description": "Detailed description of the ranch experience...",
  "streetAddress": "123 Ranch Road",
  "addressLocality": "City",
  "addressRegion": "ST",
  "postalCode": "12345",
  "country": "US",
  "phone": "+1-555-555-5555",
  "website": "https://yourranch.com",
  "image": "https://your-image-url.jpg",
  "priceRange": "$$$",
  "ratingValue": 4.8,
  "reviewCount": 127,
  "amenities": ["Horseback riding", "Fishing", "Family suites"]
}
```

3. Rebuild the site to generate the new static pages

## SEO Verification Commands

Test that pages render server-side content:

```bash
# Test homepage content
curl -sL https://duderanchretreats.com | head -n 100

# Test ranch listing
curl -sL https://duderanchretreats.com/ranches | head -n 100

# Test individual ranch page
curl -sL https://duderanchretreats.com/ranches/montana-big-sky-ranch | grep -i "Montana Big Sky Ranch"

# Check sitemap
curl -sL https://duderanchretreats.com/sitemap.xml

# Check robots.txt
curl -sL https://duderanchretreats.com/robots.txt
```

All content must be visible in the HTML source without JavaScript execution.

## Performance Features

- **Image Optimization** - Next.js automatic WebP/AVIF conversion
- **Font Loading** - Optimized Google Fonts with `font-display: swap`
- **Code Splitting** - Automatic route-based splitting
- **Prefetching** - Link prefetching for instant navigation
- **Static Assets** - CDN-ready static file serving

## SEO Implementation

- **Metadata API** - Dynamic meta tags for each page
- **JSON-LD Schema** - Structured data for search engines
- **Canonical URLs** - Proper canonical link generation
- **Open Graph** - Social media sharing optimization
- **XML Sitemap** - Auto-generated from content
- **Robots.txt** - Search engine crawling instructions

## Deployment

The site is configured for Vercel deployment with:
- Automatic static optimization
- Edge runtime for dynamic routes
- Image optimization CDN
- Analytics ready

Deploy to Vercel:
```bash
vercel --prod
```

## Migration from React SPA

This project replaces a client-side rendered React application with:

1. **Server-side content delivery** - No loading states for primary content
2. **Static pre-generation** - All ranch pages built at deploy time
3. **SEO-first architecture** - Meta tags, structured data, sitemaps
4. **Performance optimization** - Image optimization, code splitting
5. **Incremental updates** - ISR for content freshness without full rebuilds

The exact same UI/UX is maintained while delivering superior SEO and performance.

## License

© 2024 Dude Ranch Retreats. All rights reserved.