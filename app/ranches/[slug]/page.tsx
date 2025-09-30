import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Globe, MapPin, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { metaForRanch, canonicalFor } from '@/lib/seo'
import { ranchSchema, breadcrumbSchema } from '@/lib/schema'
import { supabase } from '@/integrations/supabase/client'

export const revalidate = 86400 // 24 hours

interface Props {
  params: { slug: string }
}

// Generate static params for all ranches
export async function generateStaticParams() {
  const { data: ranches } = await supabase
    .from('ranches')
    .select('slug')
  
  return ranches?.map((ranch) => ({
    slug: ranch.slug,
  })) || []
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: ranch } = await supabase
    .from('ranches')
    .select('*')
    .eq('slug', params.slug)
    .single()
  
  if (!ranch) {
    return {
      title: 'Ranch Not Found | Dude Ranch Retreats'
    }
  }
  
  const meta = metaForRanch(ranch)
  
  return {
    ...meta,
    alternates: {
      canonical: canonicalFor(`/ranches/${ranch.slug}`)
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalFor(`/ranches/${ranch.slug}`),
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630',
          width: 1200,
          height: 630,
          alt: ranch.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630'],
    }
  }
}

export default async function RanchDetailPage({ params }: Props) {
  const { data: ranch } = await supabase
    .from('ranches')
    .select(`
      *,
      states (name, code, slug)
    `)
    .eq('slug', params.slug)
    .single()
  
  if (!ranch) {
    notFound()
  }

  // Breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: canonicalFor('/') },
    { name: 'Ranches', url: canonicalFor('/ranches') },
    { name: ranch.name, url: canonicalFor(`/ranches/${ranch.slug}`) }
  ]

  // Related ranches (different state)
  const { data: relatedRanches } = await supabase
    .from('ranches')
    .select(`
      *,
      states (name, code)
    `)
    .neq('id', ranch.id)
    .neq('state_id', ranch.state_id)
    .limit(3)

  // Default image - in production you'd want actual ranch images
  const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800"

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ranchSchema(ranch)) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />
      
      {/* Breadcrumbs */}
      <nav className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/ranches" className="hover:text-foreground">Ranches</Link>
            </li>
            <li className="before:content-['/'] before:mx-2 text-foreground">{ranch.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={defaultImage}
          alt={ranch.name}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4">
                {ranch.city}, {ranch.states?.code}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                {ranch.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-white/80">{ranch.price_band}</span>
                {ranch.is_featured && (
                  <Badge className="bg-primary">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6">About {ranch.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {ranch.description}
              </p>

              {/* Amenities */}
              {ranch.amenities && ranch.amenities.length > 0 && (
                <>
                  <h3 className="text-2xl font-serif font-bold mb-4">Ranch Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {ranch.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-card border rounded-lg p-6">
                <h3 className="text-xl font-serif font-bold mb-4">Ranch Information</h3>
                
                <div className="space-y-4">
                  {ranch.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">
                          {ranch.address}<br />
                          {ranch.city}, {ranch.states?.code} {ranch.postal_code}
                        </div>
                      </div>
                    </div>
                  )}

                  {ranch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <a href={`tel:${ranch.phone}`} className="text-sm text-primary hover:underline">
                          {ranch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {ranch.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Website</div>
                        <a 
                          href={ranch.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Visit Ranch Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {ranch.website && (
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full" size="lg" asChild>
                      <a href={ranch.website} target="_blank" rel="noopener noreferrer">
                        Book Your Stay
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Ranches */}
      {relatedRanches && relatedRanches.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Explore More Ranches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRanches.map((relatedRanch) => (
                <Link 
                  key={relatedRanch.id} 
                  href={`/ranches/${relatedRanch.slug}`}
                  className="group block"
                >
                  <div className="bg-card border rounded-lg overflow-hidden transition-transform group-hover:scale-[1.02]">
                    <div className="relative h-48">
                      <Image
                        src={defaultImage}
                        alt={relatedRanch.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedRanch.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {relatedRanch.city}, {relatedRanch.states?.code}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        {relatedRanch.price_band}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}