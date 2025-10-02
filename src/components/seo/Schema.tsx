// JSON-LD structured data components
import React from 'react';
import { City, Category, Listing, Article } from '@/lib/types';

interface SchemaProps {
  children?: React.ReactNode;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dude Ranch Retreats",
    "description": "Find authentic dude ranches and Western experiences across the United States",
    "url": "https://duderanchretreats.com",
    "logo": "https://duderanchretreats.com/favicon.png",
    "sameAs": [
      "https://facebook.com/duderanchdirectory",
      "https://twitter.com/duderanches",
      "https://instagram.com/duderanchdirectory"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps extends SchemaProps {
  listing: Listing;
  city: City;
  category: Category;
  state: string;
}

export function LocalBusinessSchema({ listing, city, category, state }: LocalBusinessSchemaProps) {
  const stateFormatted = state.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": listing.name,
    "description": listing.shortDesc,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": listing.address,
      "addressLocality": city.name,
      "addressRegion": stateFormatted,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.lat,
      "longitude": city.lng
    },
    "telephone": listing.phone,
    "url": listing.website,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": listing.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "priceRange": "$$-$$$",
    "category": category.name,
    "image": listing.media?.map(m => m.url) || []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ItemListSchemaProps extends SchemaProps {
  items: Listing[];
  city: City;
  category?: Category;
  state: string;
}

export function ItemListSchema({ items, city, category, state }: ItemListSchemaProps) {
  const listName = category 
    ? `${category.name} in ${city.name}` 
    : `Dude Ranches in ${city.name}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "description": `Top-rated ${category?.name.toLowerCase() || 'dude ranches'} in ${city.name}, ${state}`,
    "numberOfItems": items.length,
    "itemListElement": items.map((listing, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": listing.name,
        "description": listing.shortDesc,
        "url": `https://duderanchretreats.com/${state}/${city.slug}/${listing.category?.slug}/${listing.slug}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": listing.rating,
          "bestRating": 5
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps extends SchemaProps {
  article: Article;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Dude Ranch Retreats"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dude Ranch Retreats",
      "logo": {
        "@type": "ImageObject",
        "url": "https://duderanchretreats.com/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://duderanchretreats.com/guides/${article.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps extends SchemaProps {
  faqs: Array<{question: string, answer: string}>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AboutPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dude Ranch Retreats",
    "description": "Learn about Dude Ranch Retreats, your trusted source for finding authentic Western ranch experiences across America",
    "url": "https://duderanchretreats.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Dude Ranch Retreats",
      "description": "Dude Ranch Retreats connects travelers with authentic dude ranch experiences across the United States, offering carefully curated listings of working ranches, guest ranches, and Western vacation destinations.",
      "url": "https://duderanchretreats.com",
      "logo": "https://duderanchretreats.com/favicon.png",
      "foundingDate": "2024",
      "sameAs": [
        "https://facebook.com/duderanchretreats",
        "https://twitter.com/duderanchretreats",
        "https://instagram.com/duderanchretreats"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}