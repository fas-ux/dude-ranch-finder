import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowLeft } from 'lucide-react'
import { canonicalFor } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { supabase } from '@/integrations/supabase/client'
import RanchCard from '@/components/ranch/RanchCard'

export const revalidate = 86400 // 24 hours

interface Props {
  params: { state: string }
}

// Get all state slugs for static generation
export async function generateStaticParams() {
  const { data: states } = await supabase
    .from('states')
    .select('slug')
  
  return states?.map((state) => ({
    state: state.slug,
  })) || []
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: state } = await supabase
    .from('states')
    .select('name, code')
    .eq('slug', params.state)
    .single()
  
  if (!state) {
    return {
      title: 'State Not Found | Dude Ranch Retreats'
    }
  }
  
  const title = `${state.name} Dude Ranches | Best Guest Ranches in ${state.name}`
  const description = `Discover authentic dude ranch experiences in ${state.name}. Browse guest ranches offering horseback riding, Western adventures, and family-friendly activities in ${state.name}.`
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalFor(`/states/${params.state}`)
    },
    openGraph: {
      title,
      description,
      url: canonicalFor(`/states/${params.state}`),
      type: 'website'
    }
  }
}

export default async function StatePage({ params }: Props) {
  const { data: state } = await supabase
    .from('states')
    .select('*')
    .eq('slug', params.state)
    .single()
  
  if (!state) {
    notFound()
  }

  const { data: ranches } = await supabase
    .from('ranches')
    .select('*')
    .eq('state_id', state.id)
    .order('is_featured', { ascending: false })
    .order('name')

  // Breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: canonicalFor('/') },
    { name: 'States', url: canonicalFor('/states') },
    { name: state.name, url: canonicalFor(`/states/${state.slug}`) }
  ]

  return (
    <>
      {/* Schema.org JSON-LD */}
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
              <Link href="/states" className="hover:text-foreground">States</Link>
            </li>
            <li className="before:content-['/'] before:mx-2 text-foreground">{state.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/states">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All States
              </Link>
            </Button>
            <Badge variant="outline" className="px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              {state.code}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            {state.name} Dude Ranches
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover authentic Western experiences and guest ranch adventures in {state.name}. 
            From horseback riding to ranch activities, find your perfect {state.name} dude ranch getaway.
          </p>
          
          {ranches && ranches.length > 0 && (
            <div className="mt-6 text-sm text-muted-foreground">
              {ranches.length} ranch{ranches.length !== 1 ? 'es' : ''} found in {state.name}
            </div>
          )}
        </div>
      </section>

      {/* Ranches */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {ranches && ranches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ranches.map((ranch) => (
                <RanchCard key={ranch.id} ranch={ranch} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-serif font-bold mb-4">No Ranches Found</h2>
              <p className="text-muted-foreground mb-6">
                We don't currently have any dude ranches listed in {state.name}.
              </p>
              <Button asChild>
                <Link href="/ranches">
                  Browse All Ranches
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related States */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Explore Other States
          </h2>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/states">
                <MapPin className="w-4 h-4 mr-2" />
                View All States
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}