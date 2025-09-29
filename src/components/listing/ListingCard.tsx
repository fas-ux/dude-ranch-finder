import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Phone, ExternalLink, MapPin } from 'lucide-react';
import { Listing } from '@/lib/types';
import { getStateSlug } from '@/lib/data/cities';

// Import images
import heroRanch from '@/assets/hero-ranch.jpg';
import ranchLandscape from '@/assets/ranch-landscape.jpg';
import ranchCabin from '@/assets/ranch-cabin.jpg';
import horsebackRiding from '@/assets/horseback-riding.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/hero-ranch.jpg': heroRanch,
  '/src/assets/ranch-landscape.jpg': ranchLandscape,
  '/src/assets/ranch-cabin.jpg': ranchCabin,
  '/src/assets/horseback-riding.jpg': horsebackRiding,
};

interface ListingCardProps {
  listing: Listing;
  showCategory?: boolean;
}

export function ListingCard({ listing, showCategory = false }: ListingCardProps) {
  if (!listing.city || !listing.category) return null;

  const stateSlug = getStateSlug(listing.city.state);
  const listingUrl = `/${stateSlug}/${listing.city.slug}/${listing.category.slug}/${listing.slug}`;
  
  const mainImage = listing.media?.[0];
  const imageUrl = mainImage ? imageMap[mainImage.url] || mainImage.url : ranchLandscape;

  return (
    <Card className="group overflow-hidden hover:shadow-warm transition-all duration-300 bg-card">
      <div className="relative">
        <img
          src={imageUrl}
          alt={mainImage?.alt || `${listing.name} ranch`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{listing.rating}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <Link to={listingUrl} className="group">
              <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                {listing.name}
              </h3>
            </Link>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.city.name}, {listing.city.state}
            </div>
          </div>
        </div>

        {showCategory && (
          <Badge variant="secondary" className="mb-3">
            {listing.category.name}
          </Badge>
        )}

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {listing.shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {listing.phone && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`tel:${listing.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            )}
            {listing.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={listing.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
          
          <Button variant="rustic" size="sm" asChild>
            <Link to={listingUrl}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}