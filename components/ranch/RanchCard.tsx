import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RanchCardProps {
  ranch: {
    id: string
    slug: string
    name: string
    description: string
    city: string
    state_id: string
    price_band: string
    amenities: string[]
    is_featured: boolean
    latitude?: number
    longitude?: number
  }
}

export default function RanchCard({ ranch }: RanchCardProps) {
  // Default image for now - in production you'd want actual ranch images
  const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  
  return (
    <Link href={`/ranches/${ranch.slug}`} className="group block">
      <article className="bg-card border rounded-lg overflow-hidden transition-transform group-hover:scale-[1.02] group-hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={defaultImage}
            alt={ranch.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {ranch.price_band || '$$'}
            </Badge>
          </div>
          {ranch.is_featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{ranch.city}</span>
          </div>
          
          <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
            {ranch.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {ranch.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {ranch.amenities && ranch.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {ranch.amenities && ranch.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{ranch.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}