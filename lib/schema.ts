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

export function faqSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dude Ranch Retreats",
    "description": "Learn about Dude Ranch Retreats, your trusted source for finding authentic Western ranch experiences across America",
    "url": `${siteUrl}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Dude Ranch Retreats",
      "description": "Dude Ranch Retreats connects travelers with authentic dude ranch experiences across the United States, offering carefully curated listings of working ranches, guest ranches, and Western vacation destinations.",
      "url": siteUrl,
      "logo": `${siteUrl}/favicon.png`,
      "foundingDate": "2024",
      "sameAs": [
        "https://facebook.com/duderanchretreats",
        "https://twitter.com/duderanchretreats",
        "https://instagram.com/duderanchretreats"
      ]
    }
  }
}