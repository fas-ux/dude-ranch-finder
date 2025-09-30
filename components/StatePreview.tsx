import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

export default async function StatePreview() {
  // Get states with ranch counts, focusing on popular states
  const { data: states } = await supabase
    .from('states')
    .select(`
      *,
      ranches:ranches(count)
    `)
    .order('name')

  // Filter states that have ranches and select featured ones
  const statesWithRanches = states?.filter(state => state.ranches?.[0]?.count > 0) || []
  
  // Show a curated selection of popular states
  const featuredStates = statesWithRanches.slice(0, 12)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {featuredStates.map((state) => (
        <Link
          key={state.id}
          href={`/states/${state.slug}`}
          className="group block p-4 bg-card border rounded-lg hover:shadow-md transition-all duration-200 text-center"
        >
          <div className="flex flex-col items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {state.code}
            </Badge>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
              {state.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{state.ranches?.[0]?.count || 0}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}