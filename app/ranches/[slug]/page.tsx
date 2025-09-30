import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Globe, MapPin, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { metaForRanch, canonicalFor } from '@/lib/seo'
import { ranchSchema, breadcrumbSchema } from '@/lib/schema'
import ranches from '@/content/ranches.json'

export const revalidate = 86400 // 24 hours

interface Props {
  params: { slug: string }
}

// Generate static params for all ranches
export async function generateStaticParams() {
  return ranches.map((ranch) => ({
    slug: ranch.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ranch = ranches.find((r) => r.slug === params.slug)
  
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
          url: ranch.image,
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
      images: [ranch.image],
    }
  }
}

export default function RanchDetailPage({ params }: Props) {
  const ranch = ranches.find((r) => r.slug === params.slug)
  
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
  const relatedRanches = ranches
    .filter(r => r.slug !== ranch.slug && r.addressRegion !== ranch.addressRegion)
    .slice(0, 3)

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
          src={ranch.image}
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
                {ranch.addressLocality}, {ranch.addressRegion}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                {ranch.name}
              </h1>
              <div className="flex items-center gap-4">
                {ranch.ratingValue && (
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span className="font-semibold">{ranch.ratingValue}</span>
                    <span className="text-white/80">({ranch.reviewCount} reviews)</span>
                  </div>
                )}
                <span className="text-white/80">{ranch.priceRange}</span>
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
              <h3 className="text-2xl font-serif font-bold mb-4">Ranch Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {ranch.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-card border rounded-lg p-6">
                <h3 className="text-xl font-serif font-bold mb-4">Ranch Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {ranch.streetAddress}<br />
                        {ranch.addressLocality}, {ranch.addressRegion} {ranch.postalCode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href={`tel:${ranch.phone}`} className="text-sm text-primary hover:underline">
                        {ranch.phone}
                      </a>
                    </div>
                  </div>

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

                  {ranch.ratingValue && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Guest Rating</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          {ranch.ratingValue}/5 ({ranch.reviewCount} reviews)
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button className="w-full" size="lg" asChild>
                    <a href={ranch.website} target="_blank" rel="noopener noreferrer">
                      Book Your Stay
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Ranches */}
      {relatedRanches.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Explore More Ranches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRanches.map((relatedRanch) => (
                <Link 
                  key={relatedRanch.slug} 
                  href={`/ranches/${relatedRanch.slug}`}
                  className="group block"
                >
                  <div className="bg-card border rounded-lg overflow-hidden transition-transform group-hover:scale-[1.02]">
                    <div className="relative h-48">
                      <Image
                        src={relatedRanch.image}
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
                        {relatedRanch.addressLocality}, {relatedRanch.addressRegion}
                      </p>
                      {relatedRanch.ratingValue && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span>{relatedRanch.ratingValue}</span>
                          <span className="text-muted-foreground">({relatedRanch.reviewCount})</span>
                        </div>
                      )}
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