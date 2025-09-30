import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import { supabase } from '@/integrations/supabase/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  
  // Get data from Supabase
  const { data: states } = await supabase.from('states').select('slug')
  const { data: ranches } = await supabase.from('ranches').select('slug')
  
  // Calculate total pages for ranch pagination
  const RANCHES_PER_PAGE = 24
  const totalPages = ranches ? Math.ceil(ranches.length / RANCHES_PER_PAGE) : 1
  
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
    {
      url: `${siteUrl}/states`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // State pages
  const statePages = states?.map((state) => ({
    url: `${siteUrl}/states/${state.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) || []
  
  
  // Ranch pagination pages
  const paginationPages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${siteUrl}/ranches/page/${i + 2}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Individual ranch pages
  const ranchPages = ranches?.map((ranch) => ({
    url: `${siteUrl}/ranches/${ranch.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) || []
  
  return [
    ...staticPages,
    ...statePages,
    ...paginationPages,
    ...ranchPages,
  ]
}