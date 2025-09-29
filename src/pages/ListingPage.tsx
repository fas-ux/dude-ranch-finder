import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Listing } from '@/lib/types';
import { getListingBySlugs, getSimilarListings } from '@/lib/data/listings';
import { MetaTags } from '@/components/seo/MetaTags';
import { LocalBusinessSchema } from '@/components/seo/Schema';
import { getListingPageMeta } from '@/lib/seo/meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Globe, Mail, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

const ListingPage = () => {
  const { state, city, category, slug } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadListing = async () => {
      if (!state || !city || !category || !slug) return;

      try {
        const listingData = await getListingBySlugs(state, city, category, slug);
        setListing(listingData);

        if (listingData) {
          const similar = await getSimilarListings(listingData.id, state, 3);
          setSimilarListings(similar);
        }
      } catch (error) {
        console.error('Error loading listing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [state, city, category, slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4 w-1/2"></div>
          <div className="h-4 bg-muted rounded mb-2 w-1/4"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-4">Ranch Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The ranch you're looking for doesn't exist or may have been moved.
        </p>
        <Button asChild variant="rustic">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const meta = getListingPageMeta(listing, listing.city!, listing.category!, state!);
  const mainImage = listing.media?.[0];

  return (
    <>
      <MetaTags meta={meta} />
      <LocalBusinessSchema 
        listing={listing} 
        city={listing.city!} 
        category={listing.category!} 
        state={state!} 
      />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to={`/${state}/${city}`} className="hover:text-primary capitalize">
              {city?.replace('-', ' ')}
            </Link>
            <span>/</span>
            <Link to={`/${state}/${city}/${category}`} className="hover:text-primary">
              {category?.replace('-', ' ')}
            </Link>
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            {listing.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{listing.address}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{listing.rating}</span>
              <span className="text-muted-foreground">/ 5</span>
            </div>

            {listing.priceBand && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {listing.priceBand}
              </Badge>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {listing.shortDesc}
          </p>
        </div>

        {/* Hero Image */}
        {mainImage && (
          <div className="mb-8">
            <img
              src={mainImage.url}
              alt={mainImage.alt}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Description */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div 
                  className="prose prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: listing.longDescMd.replace(/##/g, '<h3 class="text-xl font-serif font-semibold mb-4 mt-6">').replace(/\n\n/g, '</p><p class="mb-4">').replace(/^([^<])/g, '<p class="mb-4">$1').replace(/([^>])$/g, '$1</p>') }}
                />
              </CardContent>
            </Card>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-semibold mb-4">Ranch Activities & Amenities</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Unique Features */}
            {listing.uniqueHooks && listing.uniqueHooks.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-semibold mb-4">What Makes Us Special</h2>
                  <div className="space-y-3">
                    {listing.uniqueHooks.map((hook, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                        <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="capitalize font-medium">{hook}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4">Contact & Visit</h3>
                <div className="space-y-3">
                  {listing.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`tel:${listing.phone}`}
                        className="text-primary hover:underline"
                      >
                        {listing.phone}
                      </a>
                    </div>
                  )}
                  
                  {listing.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${listing.email}`}
                        className="text-primary hover:underline"
                      >
                        {listing.email}
                      </a>
                    </div>
                  )}

                  {listing.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={listing.website}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Official Website
                      </a>
                    </div>
                  )}
                </div>

                <Button className="w-full mt-4" variant="rustic">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Ranch
                </Button>
              </CardContent>
            </Card>

            {/* Planning Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4">Planning Your Stay</h3>
                <div className="space-y-4">
                  {listing.minStay && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Minimum Stay</div>
                        <div className="text-sm text-muted-foreground">{listing.minStay}</div>
                      </div>
                    </div>
                  )}

                  {listing.seasonality && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-medium">Season</div>
                        <div className="text-sm text-muted-foreground">
                          {listing.seasonality.openMonths.join(', ')}
                        </div>
                        {listing.seasonality.notes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {listing.seasonality.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Similar Ranches */}
            {similarListings.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-4">Similar Ranches</h3>
                  <div className="space-y-3">
                    {similarListings.map((similar) => (
                      <Link
                        key={similar.id}
                        to={`/${state}/${similar.city?.slug}/${similar.category?.slug}/${similar.slug}`}
                        className="block p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className="font-medium">{similar.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {similar.city?.name}, {similar.city?.state}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{similar.rating}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ListingPage;