// Meta tags component for dynamic SEO
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MetaData } from '@/lib/seo/meta';

interface MetaTagsProps {
  meta: MetaData;
}

export function MetaTags({ meta }: MetaTagsProps) {
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={meta.ogTitle || meta.title} />
      <meta property="og:description" content={meta.ogDescription || meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.canonical} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.ogTitle || meta.title} />
      <meta name="twitter:description" content={meta.ogDescription || meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
    </Helmet>
  );
}