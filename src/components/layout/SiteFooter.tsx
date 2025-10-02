import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import drrLogo from '@/assets/drr-logo.png';
import { supabase } from '@/integrations/supabase/client';

interface State {
  id: string;
  name: string;
  slug: string;
  ranch_count?: number;
}

export function SiteFooter() {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      const { data: statesData } = await supabase
        .from('states')
        .select('id, name, slug')
        .order('name');

      if (statesData) {
        // Get ranch counts for each state
        const statesWithCounts = await Promise.all(
          statesData.map(async (state) => {
            const { count } = await supabase
              .from('ranches')
              .select('*', { count: 'exact', head: true })
              .eq('state_id', state.id);
            
            return { ...state, ranch_count: count || 0 };
          })
        );

        // Filter states with ranches
        const statesWithRanches = statesWithCounts.filter(s => s.ranch_count && s.ranch_count > 0);
        setStates(statesWithRanches);
      }
    };

    fetchStates();
  }, []);

  const midpoint = Math.ceil(states.length / 2);
  const firstColumn = states.slice(0, midpoint);
  const secondColumn = states.slice(midpoint);

  return <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img src={drrLogo} alt="Dude Ranch Retreats" className="h-12 w-auto" />
            </div>
            <p className="text-primary-foreground/80 max-w-md">Discover authentic dude ranches and Western experiences across the United States. Find your perfect Dude Ranch Retreat today.</p>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4">Explore Ranches</h3>
            <ul className="space-y-2">
              {firstColumn.map((state) => (
                <li key={state.id}>
                  <Link 
                    to={`/ranches/${state.slug}`} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2">
              {secondColumn.map((state) => (
                <li key={state.id}>
                  <Link 
                    to={`/ranches/${state.slug}`} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Dude Ranch Retreats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}