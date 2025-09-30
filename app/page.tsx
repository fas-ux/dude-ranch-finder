import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { metaForHome, canonicalFor } from '@/lib/seo'
import { websiteSchema } from '@/lib/schema'
import { supabase } from '@/integrations/supabase/client'
import RanchCard from '@/components/ranch/RanchCard'
import StatePreview from '@/components/StatePreview'

export const metadata: Metadata = {
  ...metaForHome(),
  alternates: {
    canonical: canonicalFor('/')
  },
  openGraph: {
    title: metaForHome().title,
    description: metaForHome().description,
    url: canonicalFor('/'),
    type: 'website'
  }
}

export default async function HomePage() {
  // Get featured ranches from database
  const { data: featuredRanches } = await supabase
    .from('ranches')
    .select('*')
    .eq('is_featured', true)
    .limit(6)

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-horseback.jpg"
            alt="Family horseback riding in mountain landscape"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-32 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 drop-shadow-2xl leading-tight">
            Discover Your Perfect
            <span className="block text-stone-300">Dude Ranch Retreat</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-serif mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
            From horseback rides through mountain trails to authentic cowboy experiences, 
            find your ideal Western getaway at America's finest dude ranches
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <Link href="#featured-ranches">
                <Star className="mr-2" />
                Explore Featured Ranches
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Why Dude Ranch Retreats?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting families with authentic dude ranch experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <Image
                  src="/images/family-horseback.jpg"
                  alt="Family horseback riding experience"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Authentic Experiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hand-picked ranches offering genuine Western adventures, from cattle drives to campfire stories under starlit skies
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <Image
                  src="/images/ranch-lodge.jpg"
                  alt="Comfortable ranch accommodations"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Comfort & Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Premium accommodations that blend rustic charm with modern amenities for the perfect Western getaway
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <Image
                  src="/images/cattle-drive.jpg"
                  alt="Working ranch activities"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Real Ranch Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the authentic cowboy lifestyle with real ranch activities and learn time-honored Western traditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ranches */}
      <section id="featured-ranches" className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              ⭐ Premium Selection
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Featured Dude Ranches
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of the finest dude ranches, each offering 
              unique Western experiences and unforgettable adventures
            </p>
          </div>

          {featuredRanches && featuredRanches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRanches.map((ranch) => (
                <RanchCard key={ranch.id} ranch={ranch} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading featured ranches...</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/ranches">
                <MapPin className="mr-2" />
                Browse All Ranches
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Find Ranch by State */}
      <section id="browse-by-state" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Find Ranches by State
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore dude ranches across America's most beautiful landscapes, 
              from Montana's Big Sky country to Arkansas' Ozark Mountains
            </p>
          </div>
          
          <StatePreview />
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/states">
                <MapPin className="mr-2" />
                Browse All States
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}