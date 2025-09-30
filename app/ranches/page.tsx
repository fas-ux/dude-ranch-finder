import { Metadata } from 'next'
import { metaForRanchList, canonicalFor } from '@/lib/seo'
import { supabase } from '@/integrations/supabase/client'
import RanchCard from '@/components/ranch/RanchCard'
import { Badge } from '@/components/ui/badge'

export const revalidate = 86400 // 24 hours

interface Props {
  searchParams: { page?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = parseInt(searchParams.page || '1', 10)
  const meta = metaForRanchList(page)
  
  return {
    ...meta,
    alternates: {
      canonical: canonicalFor(page === 1 ? '/ranches' : `/ranches/page/${page}`)
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalFor(page === 1 ? '/ranches' : `/ranches/page/${page}`),
      type: 'website'
    }
  }
}

const RANCHES_PER_PAGE = 24

export default async function RanchesPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1', 10)
  const startIndex = (page - 1) * RANCHES_PER_PAGE
  
  const { data: ranches, count } = await supabase
    .from('ranches')
    .select('*', { count: 'exact' })
    .order('is_featured', { ascending: false })
    .order('name')
    .range(startIndex, startIndex + RANCHES_PER_PAGE - 1)

  const totalRanches = count || 0
  const totalPages = Math.ceil(totalRanches / RANCHES_PER_PAGE)

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            🏔️ All Destinations
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            America's Best Dude Ranches
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our complete collection of hand-picked dude ranches across the American West, 
            each offering unique adventures and authentic Western experiences.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Showing {ranches?.length || 0} of {totalRanches} ranches
            {page > 1 && ` (Page ${page} of ${totalPages})`}
          </div>
        </div>

        {/* Ranch Grid */}
        {ranches && ranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ranches.map((ranch) => (
              <RanchCard key={ranch.id} ranch={ranch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No ranches found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            {page > 1 && (
              <a 
                href={page === 2 ? '/ranches' : `/ranches/page/${page - 1}`}
                className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
              >
                Previous
              </a>
            )}
            
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            
            {page < totalPages && (
              <a 
                href={`/ranches/page/${page + 1}`}
                className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}