import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RanchCardProps {
  ranch: {
    slug: string
    name: string
    description: string
    addressLocality: string
    addressRegion: string
    image: string
    priceRange: string
    ratingValue?: number
    reviewCount?: number
    amenities: string[]
  }
}

export default function RanchCard({ ranch }: RanchCardProps) {
  return (
    <Link href={`/ranches/${ranch.slug}`} className="group block">
      <article className="bg-card border rounded-lg overflow-hidden transition-transform group-hover:scale-[1.02] group-hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={ranch.image}
            alt={ranch.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {ranch.priceRange}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{ranch.addressLocality}, {ranch.addressRegion}</span>
          </div>
          
          <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
            {ranch.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {ranch.description}
          </p>
          
          {ranch.ratingValue && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span className="font-semibold text-sm">{ranch.ratingValue}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({ranch.reviewCount} reviews)
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {ranch.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {ranch.amenities.length > 3 && (
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