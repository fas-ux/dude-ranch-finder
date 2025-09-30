import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import ranches from '@/content/ranches.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  // Calculate total pages for ranch pagination
  const RANCHES_PER_PAGE = 24
  const totalPages = Math.ceil(ranches.length / RANCHES_PER_PAGE)
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/ranches`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]
  
  // Ranch pagination pages
  const paginationPages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${siteUrl}/ranches/page/${i + 2}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Individual ranch pages
  const ranchPages = ranches.map((ranch) => ({
    url: `${siteUrl}/ranches/${ranch.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [
    ...staticPages,
    ...paginationPages,
    ...ranchPages,
  ]
}