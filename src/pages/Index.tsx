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

// Import images
import heroHorsebackMountain from '@/assets/hero-horseback-mountain.png';
import authenticExperience from '@/assets/authentic-experience.png';
import ranchLodge from '@/assets/ranch-lodge.jpg';
import cattleDrive from '@/assets/cattle-drive.jpg';
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
  return <>
      <MetaTags meta={metaData} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${heroHorsebackMountain})`
      }} />
        <div className="relative z-10 container mx-auto px-4 py-32 text-center text-white">
          <div className="mb-4">
            
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 drop-shadow-2xl leading-tight">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-white">Dude Ranch Retreat</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
            From horseback rides through mountain trails to authentic cowboy experiences, 
            find your ideal Western getaway at America's finest dude ranches
          </p>
          
          <div className="mb-12 max-w-4xl mx-auto">
            <CityCategorySearch />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="rustic" size="lg" className="px-8 py-4 text-lg" asChild>
              <Link to="#featured-ranches">
                <Star className="mr-2" />
                Explore Featured Ranches
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Why Dude Ranch Retreats?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Connecting families with authentic dude ranch experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img src={authenticExperience} alt="Young cowboy experiencing authentic ranch life" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Authentic Experiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hand-picked ranches offering genuine Western adventures, from cattle drives to campfire stories under starlit skies
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img src={ranchLodge} alt="Comfortable ranch accommodations" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Comfort & Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Premium accommodations that blend rustic charm with modern amenities for the perfect Western getaway
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img src={cattleDrive} alt="Working ranch activities" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Real Ranch Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the authentic cowboy lifestyle with real ranch activities and learn time-honored Western traditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ranches */}
      <section id="featured-ranches" className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              ⭐ Premium Selection
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Featured Dude Ranches
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of the finest dude ranches, each offering 
              unique Western experiences and unforgettable adventures
            </p>
          </div>

          {featuredListings.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map(listing => <ListingCard key={listing.id} listing={listing} showCategory={true} />)}
            </div> : <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Loading featured ranches...</p>
            </div>}
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="#browse-by-state">
                <MapPin className="mr-2" />
                Browse All Ranches
              </Link>
            </Button>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/guides/best-dude-ranches-for-families" className="text-primary hover:underline">
                Family Ranch Guide
              </Link>
              <Link to="/guides/luxury-dude-ranch-experiences" className="text-primary hover:underline">
                Luxury Ranches
              </Link>
              <Link to="/blog" className="text-primary hover:underline">
                Ranch Travel Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Find Ranch by State */}
      <section id="browse-by-state" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Find Ranches by State
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore dude ranches across America's most beautiful landscapes, 
              from Montana's Big Sky country to Texas hill country
            </p>
          </div>
          <StateSearch />
        </div>
      </section>
    </>;
};
export default Index;