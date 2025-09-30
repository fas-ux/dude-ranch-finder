import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users } from 'lucide-react'
import { canonicalFor } from '@/lib/seo'
import { supabase } from '@/integrations/supabase/client'

export const revalidate = 86400 // 24 hours

export const metadata: Metadata = {
  title: 'Dude Ranches by State | Find Guest Ranches Across America',
  description: 'Browse dude ranches and guest ranches by state. Find authentic Western experiences, horseback riding, and ranch vacations across the United States.',
  alternates: {
    canonical: canonicalFor('/states')
  },
  openGraph: {
    title: 'Dude Ranches by State | Find Guest Ranches Across America',
    description: 'Browse dude ranches and guest ranches by state. Find authentic Western experiences across the United States.',
    url: canonicalFor('/states'),
    type: 'website'
  }
}

export default async function StatesPage() {
  const { data: states } = await supabase
    .from('states')
    .select(`
      *,
      ranches:ranches(count)
    `)
    .order('name')

  // Group states by region
  const regions = {
    West: ['Arizona', 'California', 'Colorado', 'Idaho', 'Montana', 'Nevada', 'New Mexico', 'Utah', 'Wyoming'],
    Pacific: ['Oregon', 'Washington'],
    South: ['Arkansas', 'Georgia', 'North Carolina', 'Tennessee', 'Texas', 'Virginia'],
    Northeast: ['New York', 'Pennsylvania'],
    Midwest: ['Michigan', 'Missouri', 'Nebraska', 'Ohio', 'South Dakota']
  }

  const groupedStates = Object.entries(regions).map(([region, stateNames]) => ({
    region,
    states: states?.filter(state => stateNames.includes(state.name)) || []
  }))

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li className="before:content-['/'] before:mx-2 text-foreground">States</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              🗺️ Browse by Location
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Dude Ranches by State
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore authentic Western experiences across America. From the Rocky Mountains to rolling hills, 
              find the perfect dude ranch adventure in your preferred state.
            </p>
          </div>
        </div>
      </section>

      {/* States by Region */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {groupedStates.map(({ region, states: regionStates }) => (
            <div key={region} className="mb-16">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">
                {region}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regionStates.map((state) => (
                  <Link
                    key={state.id}
                    href={`/states/${state.slug}`}
                    className="group block p-6 bg-card border rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {state.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {state.code}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{state.code}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {state.ranches?.[0]?.count || 0} ranch{state.ranches?.[0]?.count !== 1 ? 'es' : ''}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Can't Find Your State?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly adding new dude ranches and guest ranches to our directory. 
            Browse all our current listings or contact us about ranches in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ranches"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse All Ranches
            </Link>
            <Link
              href="/advertise"
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              List Your Ranch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}