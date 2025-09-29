'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { getCities } from '@/lib/data/cities';
import { getCategories } from '@/lib/data/categories';
import { getStateSlug } from '@/lib/data/cities';
import { City, Category } from '@/lib/types';

export function CityCategorySearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredResults, setFilteredResults] = useState<{
    cities: City[];
    categories: Category[];
  }>({ cities: [], categories: [] });

  useEffect(() => {
    const loadData = async () => {
      const [citiesData, categoriesData] = await Promise.all([
        getCities(),
        getCategories()
      ]);
      setCities(citiesData);
      setCategories(categoriesData);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults({ cities: [], categories: [] });
      return;
    }

    const term = searchTerm.toLowerCase();
    const filteredCities = cities.filter(city => 
      city.name.toLowerCase().includes(term) || 
      city.state.toLowerCase().includes(term)
    ).slice(0, 5);

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(term)
    ).slice(0, 3);

    setFilteredResults({ cities: filteredCities, categories: filteredCategories });
  }, [searchTerm, cities, categories]);

  const handleCityClick = (city: City) => {
    const stateSlug = getStateSlug(city.state);
    navigate(`/${stateSlug}/${city.slug}`);
    setSearchTerm('');
  };

  const handleCategoryClick = (category: Category) => {
    // Navigate to first city with this category for demo
    if (cities.length > 0) {
      const city = cities[0];
      const stateSlug = getStateSlug(city.state);
      navigate(`/${stateSlug}/${city.slug}/${category.slug}`);
      setSearchTerm('');
    }
  };

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search cities or activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-2 border-accent/20 focus:border-accent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      </div>

      {(filteredResults.cities.length > 0 || filteredResults.categories.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border shadow-warm z-50">
          {filteredResults.cities.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Cities</h4>
              <div className="space-y-2">
                {filteredResults.cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCityClick(city)}
                    className="w-full text-left p-2 hover:bg-secondary rounded-md transition-smooth"
                  >
                    <div className="font-medium">{city.name}, {city.state}</div>
                    <div className="text-sm text-muted-foreground">
                      Population: {city.population.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredResults.categories.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Activities</h4>
              <div className="space-y-2">
                {filteredResults.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left p-2 hover:bg-secondary rounded-md transition-smooth"
                  >
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}