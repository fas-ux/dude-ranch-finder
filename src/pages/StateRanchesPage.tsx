import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRanchesByState } from '@/lib/data/ranches';
import { Listing } from '@/lib/types';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Globe } from 'lucide-react';

export default function StateRanchesPage() {
  const { state } = useParams<{ state: string }>();
  const [ranches, setRanches] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state) return;
    
    const loadRanches = async () => {
      try {
        const data = await getRanchesByState(state);
        setRanches(data);
      } catch (error) {
        console.error('Error loading ranches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRanches();
  }, [state]);

  const stateDisplay = state?.toUpperCase() || '';
  const pageTitle = `${stateDisplay} Dude Ranches | Authentic Ranch Vacations`;
  const pageDescription = `Discover the best dude ranches in ${stateDisplay}. Compare amenities, activities, and accommodations at authentic ranch destinations.`;

  // Generate JSON-LD structured data
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${stateDisplay} Dude Ranches`,
    "description": pageDescription,
    "numberOfItems": ranches.length,
    "itemListElement": ranches.map((ranch, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "@id": `${window.location.origin}/${state}/${ranch.slug}`,
        "name": ranch.name,
        "url": `${window.location.origin}/${state}/${ranch.slug}`,
        "address": ranch.address,
        "telephone": ranch.phone,
        "description": ranch.shortDesc
      }
    }))
  };

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="container mx-auto py-12 px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading ranches...</div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${window.location.origin}/${state}/dude-ranches`} />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      </Helmet>

      <SiteHeader />
      
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {stateDisplay} Dude Ranches
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore authentic ranch experiences in {stateDisplay}. From working cattle ranches to luxury guest ranches, 
              find the perfect western getaway with horseback riding, outdoor adventures, and genuine hospitality.
            </p>
          </header>

          {ranches.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No ranches found</h2>
              <p className="text-muted-foreground">
                We haven't found any dude ranches in {stateDisplay} yet. Check back soon as we continue to expand our directory.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ranches.map((ranch) => (
                <Card key={ranch.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          <Link 
                            to={`/${state}/${ranch.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {ranch.name}
                          </Link>
                        </CardTitle>
                        {ranch.city?.name && (
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {ranch.city.name}, {stateDisplay}
                          </CardDescription>
                        )}
                      </div>
                      {ranch.isFeatured && (
                        <Badge variant="secondary" className="ml-2">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {ranch.shortDesc}
                    </p>
                    
                    {ranch.amenities && ranch.amenities.length > 0 && (
                      <div className="mb-4">
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
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {ranch.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            Phone
                          </span>
                        )}
                        {ranch.website && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Website
                          </span>
                        )}
                      </div>
                      
                      {ranch.priceBand && (
                        <Badge variant="secondary">
                          {ranch.priceBand}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}