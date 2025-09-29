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
import { getCities, getStateSlug } from '@/lib/data/cities';
import { getCategories } from '@/lib/data/categories';
import { getFeaturedListings } from '@/lib/data/listings';
import { City, Category, Listing } from '@/lib/types';
import { Star, ArrowRight, MapPin, Activity } from 'lucide-react';

// Import hero image
import heroRanch from '@/assets/hero-ranch.jpg';

const Index = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [citiesData, categoriesData, featuredData] = await Promise.all([
        getCities(),
        getCategories(),
        getFeaturedListings(6)
      ]);
      setCities(citiesData);
      setCategories(categoriesData);
      setFeaturedListings(featuredData);
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

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore the most sought-after ranch destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.slice(0, 3).map((city) => (
              <Card key={city.id} className="group overflow-hidden hover:shadow-warm transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-accent mr-2" />
                      <h3 className="font-serif text-xl font-semibold">
                        {city.name}, {city.state}
                      </h3>
                    </div>
                    <Badge variant="secondary">
                      {city.population.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {city.description}
                  </p>
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/${getStateSlug(city.state)}/${city.slug}`}>
                      Explore Ranches
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Ranch Activities
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect Western adventure for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group text-center hover:shadow-warm transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Activity className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/${getStateSlug(cities[0]?.state || 'wyoming')}/${cities[0]?.slug || 'jackson'}/${category.slug}`}>
                      Explore
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
