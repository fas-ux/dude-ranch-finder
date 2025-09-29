import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get all states and ranches
    const { data: states } = await supabaseClient
      .from('states')
      .select('id, slug, name')
      .order('name')

    const { data: ranches } = await supabaseClient
      .from('ranches')
      .select('slug, name, city, state_id, updated_at')
      .order('name')

    // Get state slugs mapping
    const stateMap = new Map(states?.map(s => [s.id, s.slug]) || [])

    const baseUrl = 'https://duderanch-directory.com'
    const currentDate = new Date().toISOString().split('T')[0]

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/advertise</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`

    // Add state pages
    states?.forEach(state => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${state.slug}/dude-ranches</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    })

    // Add ranch detail pages
    ranches?.forEach(ranch => {
      const stateSlug = stateMap.get(ranch.state_id)
      if (stateSlug) {
        const lastmod = ranch.updated_at ? new Date(ranch.updated_at).toISOString().split('T')[0] : currentDate
        sitemap += `
  <url>
    <loc>${baseUrl}/${stateSlug}/${ranch.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      }
    })

    // Add guide pages (static content)
    const guideTopics = [
      'best-dude-ranches-for-families',
      'luxury-dude-ranch-experiences',
      'working-ranch-vacations',
      'horseback-riding-guides',
      'ranch-wedding-venues',
      'corporate-retreat-ranches'
    ]

    guideTopics.forEach(topic => {
      sitemap += `
  <url>
    <loc>${baseUrl}/guides/${topic}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })

    sitemap += `
</urlset>`

    return new Response(sitemap, {
      headers: corsHeaders
    })

  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response('Error generating sitemap', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})