'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Ranch {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: { name: string; slug: string };
}

interface State {
  id: string;
  name: string;
  slug: string;
  ranch_count: number;
}

export function CityCategorySearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ranches, setRanches] = useState<Ranch[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [filteredResults, setFilteredResults] = useState<{
    ranches: Ranch[];
    states: State[];
  }>({ ranches: [], states: [] });

  useEffect(() => {
    const loadData = async () => {
      // Load ranches
      const { data: ranchesData } = await supabase
        .from('ranches')
        .select(`
          id,
          name,
          slug,
          city,
          state:states(name, slug)
        `)
        .order('name');

      // Load states with ranch counts
      const { data: statesData } = await supabase
        .from('states')
        .select('id, name, slug')
        .order('name');

      if (statesData) {
        const statesWithCounts = await Promise.all(
          statesData.map(async (state) => {
            const { count } = await supabase
              .from('ranches')
              .select('*', { count: 'exact', head: true })
              .eq('state_id', state.id);
            
            return {
              ...state,
              ranch_count: count || 0
            };
          })
        );

        setStates(statesWithCounts.filter(state => state.ranch_count > 0));
      }

      setRanches(ranchesData || []);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults({ ranches: [], states: [] });
      return;
    }

    const term = searchTerm.toLowerCase();
    const filteredRanches = ranches.filter(ranch => 
      ranch.name.toLowerCase().includes(term) || 
      ranch.city?.toLowerCase().includes(term) ||
      ranch.state?.name.toLowerCase().includes(term)
    ).slice(0, 5);

    const filteredStates = states.filter(state =>
      state.name.toLowerCase().includes(term)
    ).slice(0, 3);

    setFilteredResults({ ranches: filteredRanches, states: filteredStates });
  }, [searchTerm, ranches, states]);

  const handleRanchClick = (ranch: Ranch) => {
    navigate(`/${ranch.state.slug}/${ranch.slug}`);
    setSearchTerm('');
  };

  const handleStateClick = (state: State) => {
    navigate(`/${state.slug}/dude-ranches`);
    setSearchTerm('');
  };

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search ranches, cities, or states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-2 border-accent/20 focus:border-accent text-black placeholder:text-gray-600"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
      </div>

      {(filteredResults.ranches.length > 0 || filteredResults.states.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border shadow-warm z-50">
          {filteredResults.ranches.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Ranches</h4>
              <div className="space-y-2">
                {filteredResults.ranches.map((ranch) => (
                  <button
                    key={ranch.id}
                    onClick={() => handleRanchClick(ranch)}
                    className="w-full text-left p-2 hover:bg-secondary rounded-md transition-smooth text-black"
                  >
                    <div className="font-medium text-black">{ranch.name}</div>
                    <div className="text-sm text-gray-600">
                      {ranch.city}, {ranch.state?.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredResults.states.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">States</h4>
              <div className="space-y-2">
                {filteredResults.states.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className="w-full text-left p-2 hover:bg-secondary rounded-md transition-smooth text-black"
                  >
                    <div className="font-medium text-black">{state.name}</div>
                    <div className="text-sm text-gray-600">
                      {state.ranch_count} {state.ranch_count === 1 ? 'ranch' : 'ranches'}
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