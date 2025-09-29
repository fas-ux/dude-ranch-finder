// Homepage - Dude Ranch Directory
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MetaTags } from '@/components/seo/MetaTags';
import { CityCategorySearch } from '@/components/search/CityCategorySearch';
import { ListingCard } from '@/components/listing/ListingCard';
import { getHomePageMeta } from '@/lib/seo/meta';
import { getRanches } from '@/lib/data/ranches';
import StateSearch from '@/components/search/StateSearch';
import { City, Category, Listing } from '@/lib/types';
import { Star, ArrowRight, MapPin, Activity } from 'lucide-react';

// Import hero image
import heroRanch from '@/assets/hero-ranch.jpg';

const Index = () => {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const ranches = await getRanches();
      // Get featured ranches (marked as featured or first 6)
      const featured = ranches.filter(ranch => ranch.isFeatured).slice(0, 6);
      if (featured.length < 6) {
        const remaining = ranches.filter(ranch => !ranch.isFeatured).slice(0, 6 - featured.length);
        setFeaturedListings([...featured, ...remaining]);
      } else {
        setFeaturedListings(featured);
      }
    };
    loadData();
  }, []);

  const metaData = getHomePageMeta();

  return (
    <>
      <MetaTags meta={metaData} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroRanch})` 
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 drop-shadow-lg">
            Find Your Perfect
            <span className="block text-accent">Dude Ranch</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif mb-8 max-w-2xl mx-auto opacity-90">
            Discover authentic Western experiences at the finest dude ranches across America
          </p>
          
          <div className="mb-8">
            <CityCategorySearch />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="rustic" size="lg" asChild>
              <Link to="#featured-ranches">
                Explore Ranches
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="western" size="lg" asChild>
              <Link to="/advertise">List Your Ranch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Ranches */}
      <section id="featured-ranches" className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Featured Dude Ranches
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hand-picked premium ranches offering exceptional Western experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                showCategory={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Find Ranch by State */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StateSearch />
        </div>
      </section>
    </>
  );
};

export default Index;
