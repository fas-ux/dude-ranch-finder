import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Search, MapPin } from 'lucide-react';

interface State {
  id: string;
  name: string;
  code: string;
  slug: string;
  ranch_count?: number;
}

export default function StateSearch() {
  const [states, setStates] = useState<State[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStates = async () => {
      try {
        // Get states with ranch counts
        const { data: statesData, error: statesError } = await (supabase as any)
          .from('states')
          .select(`
            id,
            name,
            code,
            slug
          `)
          .order('name');

        if (statesError) throw statesError;

        // Get ranch counts for each state
        const statesWithCounts = await Promise.all(
          (statesData || []).map(async (state) => {
            const { count } = await (supabase as any)
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
      } catch (error) {
        console.error('Error loading states:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStates();
  }, []);

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Browse by State</CardTitle>
          <CardDescription>Loading states...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-warm border-2">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-display">
          <MapPin className="h-7 w-7 text-primary" />
          Browse Ranches by State
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Discover authentic Western experiences across America
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStates.map((state) => (
              <Link
                key={state.id}
                to={`/${state.slug}/dude-ranches`}
                className="group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-warm hover:border-primary transition-all duration-300 hover-scale shadow-card hover:shadow-warm"
              >
                <div className="p-5 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-1">
                        {state.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                        {state.code}
                      </p>
                    </div>
                    <MapPin className="h-5 w-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/10 text-primary font-semibold px-3 py-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {state.ranch_count} {state.ranch_count === 1 ? 'Ranch' : 'Ranches'}
                    </Badge>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors ml-auto">
                      Explore →
                    </span>
                  </div>
                </div>

                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>
              </Link>
            ))}
          </div>

          {filteredStates.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                No states found matching <span className="font-semibold text-foreground">"{searchTerm}"</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching for a different state name
              </p>
            </div>
          )}

          {filteredStates.length === 0 && !searchTerm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No ranches available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}