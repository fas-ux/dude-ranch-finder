import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metaForRanchList, canonicalFor } from '@/lib/seo'
import ranches from '@/content/ranches.json'
import RanchCard from '@/components/ranch/RanchCard'
import { Badge } from '@/components/ui/badge'

export const revalidate = 86400 // 24 hours

const RANCHES_PER_PAGE = 24

interface Props {
  params: { page: string }
}

export async function generateStaticParams() {
  const totalPages = Math.ceil(ranches.length / RANCHES_PER_PAGE)
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString() // Start from page 2
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parseInt(params.page, 10)
  
  if (page <= 1) {
    redirect('/ranches')
  }
  
  const meta = metaForRanchList(page)
  
  return {
    ...meta,
    alternates: {
      canonical: canonicalFor(`/ranches/page/${page}`)
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalFor(`/ranches/page/${page}`),
      type: 'website'
    }
  }
}

export default function RanchesPagePaginated({ params }: Props) {
  const page = parseInt(params.page, 10)
  const totalPages = Math.ceil(ranches.length / RANCHES_PER_PAGE)
  
  if (page <= 1) {
    redirect('/ranches')
  }
  
  if (page > totalPages) {
    redirect('/ranches')
  }
  
  const startIndex = (page - 1) * RANCHES_PER_PAGE
  const endIndex = startIndex + RANCHES_PER_PAGE
  const paginatedRanches = ranches.slice(startIndex, endIndex)

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
            Explore our complete collection of hand-picked dude ranches across the American West.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Showing {paginatedRanches.length} of {ranches.length} ranches (Page {page} of {totalPages})
          </div>
        </div>

        {/* Ranch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedRanches.map((ranch) => (
            <RanchCard key={ranch.slug} ranch={ranch} />
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  )
}