import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRanchBySlug, getRanchesByState } from '@/lib/data/ranches';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Listing } from '@/lib/types';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Globe, Mail, Calendar, DollarSign, Users, Star, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function RanchDetailPage() {
  const { state, slug } = useParams<{ state: string; slug: string }>();
  const [ranch, setRanch] = useState<Listing | null>(null);
  const [similarRanches, setSimilarRanches] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const loadRanch = async () => {
      try {
        const ranchData = await getRanchBySlug(slug);
        setRanch(ranchData);
        
        if (ranchData && state) {
          // Get other ranches in the same state for similar recommendations
          const stateRanches = await getRanchesByState(state);
          const similar = stateRanches
            .filter(r => r.id !== ranchData.id)
            .slice(0, 3);
          setSimilarRanches(similar);
        }
      } catch (error) {
        console.error('Error loading ranch:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRanch();
  }, [slug, state]);

  if (loading) {
    return (
      <>
        <main className="container mx-auto py-12 px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading ranch details...</div>
          </div>
        </main>
      </>
    );
  }

  if (!ranch) {
    return (
      <>
        <main className="container mx-auto py-12 px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Ranch Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The ranch you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </main>
      </>
    );
  }

  const stateDisplay = state?.toUpperCase() || '';
  const pageTitle = `${ranch.name} - ${stateDisplay} Dude Ranch | Authentic Ranch Experience`;
  const pageDescription = ranch.shortDesc || `Experience authentic ranch life at ${ranch.name} in ${stateDisplay}. Book your western adventure today.`;
  const canonicalUrl = `${window.location.origin}/${state}/${slug}`;

  // Generate JSON-LD structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": canonicalUrl,
    "name": ranch.name,
    "description": ranch.shortDesc,
    "url": canonicalUrl,
    "sameAs": ranch.website ? [ranch.website] : undefined,
    "address": ranch.address ? {
      "@type": "PostalAddress",
      "streetAddress": ranch.address,
      "addressLocality": ranch.city?.name,
      "addressRegion": stateDisplay,
      "postalCode": ranch.postcode
    } : undefined,
    "telephone": ranch.phone,
    "email": ranch.email,
    "geo": ranch.lat && ranch.lng ? {
      "@type": "GeoCoordinates",
      "latitude": ranch.lat,
      "longitude": ranch.lng
    } : undefined,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ranch.rating,
      "ratingCount": 1
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="business.business" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* State Header Section */}
          <div className="mb-6">
            <Link 
              to={`/${state}/dude-ranches`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              ← Back to {stateDisplay} Ranches
            </Link>
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {stateDisplay} Dude Ranches
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Explore authentic ranch experiences in {stateDisplay}. From working cattle ranches to luxury guest ranches, 
                find the perfect western getaway with horseback riding, outdoor adventures, and genuine hospitality.
              </p>
            </header>
          </div>

          <Separator className="mb-8" />

          {/* Ranch Details Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{ranch.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {ranch.city?.name && `${ranch.city.name}, `}{stateDisplay}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {ranch.isFeatured && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Featured Ranch
                  </Badge>
                )}
                {ranch.priceBand && (
                  <Badge variant="outline">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {ranch.priceBand}
                  </Badge>
                )}
              </div>
            </div>

            {ranch.shortDesc && (
              <p className="text-xl text-muted-foreground max-w-4xl">
                {ranch.shortDesc}
              </p>
            )}
          </header>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {ranch.longDescMd && (
                <Card>
                  <CardHeader>
                    <CardTitle>About {ranch.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: ranch.longDescMd }} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Amenities */}
              {ranch.amenities && ranch.amenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ranch Amenities & Activities</CardTitle>
                    <CardDescription>
                      What you can expect during your stay
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {ranch.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Similar Ranches */}
              {similarRanches.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>More {stateDisplay} Ranches</CardTitle>
                    <CardDescription>
                      Other authentic ranch experiences in the area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {similarRanches.map((similar) => (
                        <div key={similar.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <h4 className="font-semibold mb-1">
                            <Link 
                              to={`/${state}/${similar.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {similar.name}
                            </Link>
                          </h4>
                          {similar.city?.name && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {similar.city.name}, {stateDisplay}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {similar.shortDesc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ranch.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{ranch.address}</p>
                        {ranch.postcode && (
                          <p className="text-sm text-muted-foreground">{ranch.postcode}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {ranch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <a 
                          href={`tel:${ranch.phone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {ranch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {ranch.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a 
                          href={`mailto:${ranch.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {ranch.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {ranch.website && (
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <a 
                          href={ranch.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Official Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{ranch.rating}</span>
                    </div>
                  </div>
                  
                  {ranch.priceBand && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="font-medium">{ranch.priceBand}</span>
                    </div>
                  )}

                  <Separator />
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Information is provided by the ranch and verified when possible. 
                    Contact the ranch directly for the most current details and availability.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}