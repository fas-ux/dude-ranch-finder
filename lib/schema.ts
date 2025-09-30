import { siteUrl } from './seo'

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dude Ranch Retreats",
    "url": siteUrl,
    "description": "Discover America's finest dude ranches offering authentic Western experiences and family adventures",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/ranches?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}

export function breadcrumbSchema(segments: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": segment.name,
      "item": segment.url
    }))
  }
}

export function ranchSchema(ranch: any) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": ranch.name,
    "description": ranch.description,
    "url": ranch.website,
    "telephone": ranch.phone,
    "priceRange": ranch.priceRange,
    "image": ranch.image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ranch.streetAddress,
      "addressLocality": ranch.addressLocality,
      "addressRegion": ranch.addressRegion,
      "postalCode": ranch.postalCode,
      "addressCountry": ranch.country
    },
    "amenityFeature": ranch.amenities.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    }))
  }

  if (ranch.ratingValue && ranch.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": ranch.ratingValue,
      "reviewCount": ranch.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  }

  return schema
}