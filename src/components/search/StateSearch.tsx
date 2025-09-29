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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Browse Ranches by State
        </CardTitle>
        <CardDescription>
          Find dude ranches in your preferred destination
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStates.map((state) => (
              <Link
                key={state.id}
                to={`/${state.slug}/dude-ranches`}
                className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{state.name}</h3>
                    <p className="text-sm text-muted-foreground">{state.code}</p>
                  </div>
                  <Badge variant="secondary">
                    {state.ranch_count} {state.ranch_count === 1 ? 'ranch' : 'ranches'}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>

          {filteredStates.length === 0 && searchTerm && (
            <p className="text-center text-muted-foreground py-4">
              No states found matching "{searchTerm}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}