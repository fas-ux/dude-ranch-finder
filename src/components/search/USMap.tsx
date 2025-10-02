import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MapPin } from 'lucide-react';

interface State {
  id: string;
  name: string;
  code: string;
  slug: string;
  ranch_count?: number;
}

// State coordinates and paths for SVG map
const stateData: Record<string, { path: string; abbreviation: string }> = {
  'washington': { path: 'M 50 30 L 120 30 L 120 80 L 50 80 Z', abbreviation: 'WA' },
  'oregon': { path: 'M 50 85 L 120 85 L 120 140 L 50 140 Z', abbreviation: 'OR' },
  'california': { path: 'M 45 145 L 115 145 L 100 280 L 60 280 Z', abbreviation: 'CA' },
  'idaho': { path: 'M 125 30 L 180 50 L 180 140 L 125 140 Z', abbreviation: 'ID' },
  'nevada': { path: 'M 120 145 L 180 145 L 165 250 L 120 230 Z', abbreviation: 'NV' },
  'utah': { path: 'M 185 145 L 240 145 L 240 235 L 185 235 Z', abbreviation: 'UT' },
  'arizona': { path: 'M 170 255 L 240 240 L 240 300 L 185 300 Z', abbreviation: 'AZ' },
  'montana': { path: 'M 185 30 L 320 30 L 320 90 L 185 90 Z', abbreviation: 'MT' },
  'wyoming': { path: 'M 185 95 L 320 95 L 320 150 L 185 150 Z', abbreviation: 'WY' },
  'colorado': { path: 'M 245 150 L 380 150 L 380 210 L 245 210 Z', abbreviation: 'CO' },
  'new-mexico': { path: 'M 245 240 L 380 240 L 380 310 L 245 310 Z', abbreviation: 'NM' },
  'north-dakota': { path: 'M 325 30 L 440 30 L 440 85 L 325 85 Z', abbreviation: 'ND' },
  'south-dakota': { path: 'M 325 90 L 440 90 L 440 145 L 325 145 Z', abbreviation: 'SD' },
  'nebraska': { path: 'M 325 150 L 470 150 L 470 200 L 325 200 Z', abbreviation: 'NE' },
  'kansas': { path: 'M 385 215 L 520 215 L 520 265 L 385 265 Z', abbreviation: 'KS' },
  'oklahoma': { path: 'M 385 270 L 540 270 L 540 310 L 385 310 Z', abbreviation: 'OK' },
  'texas': { path: 'M 385 315 L 540 315 L 540 430 L 460 430 L 440 380 L 385 360 Z', abbreviation: 'TX' },
  'minnesota': { path: 'M 445 40 L 550 35 L 555 90 L 445 90 Z', abbreviation: 'MN' },
  'iowa': { path: 'M 475 155 L 560 155 L 560 205 L 475 205 Z', abbreviation: 'IA' },
  'missouri': { path: 'M 525 215 L 600 215 L 600 280 L 525 280 Z', abbreviation: 'MO' },
  'arkansas': { path: 'M 545 285 L 615 285 L 615 340 L 545 340 Z', abbreviation: 'AR' },
  'louisiana': { path: 'M 545 345 L 625 345 L 625 400 L 560 400 Z', abbreviation: 'LA' },
  'wisconsin': { path: 'M 560 95 L 630 100 L 630 160 L 560 160 Z', abbreviation: 'WI' },
  'illinois': { path: 'M 605 165 L 655 165 L 655 255 L 605 255 Z', abbreviation: 'IL' },
  'michigan': { path: 'M 635 105 L 705 100 L 715 110 L 715 165 L 685 175 L 685 140 L 665 140 L 665 165 L 635 165 Z', abbreviation: 'MI' },
  'indiana': { path: 'M 660 170 L 710 170 L 710 235 L 660 235 Z', abbreviation: 'IN' },
  'ohio': { path: 'M 715 175 L 770 175 L 770 240 L 715 240 Z', abbreviation: 'OH' },
  'kentucky': { path: 'M 660 245 L 770 245 L 770 280 L 660 280 Z', abbreviation: 'KY' },
  'tennessee': { path: 'M 620 285 L 770 285 L 770 320 L 620 320 Z', abbreviation: 'TN' },
  'mississippi': { path: 'M 630 325 L 680 325 L 680 400 L 630 400 Z', abbreviation: 'MS' },
  'alabama': { path: 'M 685 325 L 735 325 L 735 405 L 685 405 Z', abbreviation: 'AL' },
  'georgia': { path: 'M 740 285 L 800 285 L 800 395 L 740 395 Z', abbreviation: 'GA' },
  'florida': { path: 'M 740 400 L 800 400 L 815 455 L 780 475 L 745 450 Z', abbreviation: 'FL' },
  'south-carolina': { path: 'M 805 300 L 860 300 L 860 345 L 805 345 Z', abbreviation: 'SC' },
  'north-carolina': { path: 'M 775 255 L 870 255 L 870 295 L 775 295 Z', abbreviation: 'NC' },
  'virginia': { path: 'M 775 220 L 875 210 L 880 235 L 775 250 Z', abbreviation: 'VA' },
  'west-virginia': { path: 'M 775 200 L 825 200 L 825 240 L 775 240 Z', abbreviation: 'WV' },
  'pennsylvania': { path: 'M 775 160 L 875 160 L 875 200 L 775 200 Z', abbreviation: 'PA' },
  'new-york': { path: 'M 775 110 L 885 110 L 885 155 L 775 155 Z', abbreviation: 'NY' },
  'vermont': { path: 'M 880 80 L 910 80 L 910 115 L 880 115 Z', abbreviation: 'VT' },
  'new-hampshire': { path: 'M 915 80 L 940 80 L 940 120 L 915 120 Z', abbreviation: 'NH' },
  'maine': { path: 'M 915 45 L 960 45 L 960 100 L 940 100 L 940 75 L 915 75 Z', abbreviation: 'ME' },
  'massachusetts': { path: 'M 890 120 L 955 120 L 955 140 L 890 140 Z', abbreviation: 'MA' },
  'rhode-island': { path: 'M 945 135 L 960 135 L 960 148 L 945 148 Z', abbreviation: 'RI' },
  'connecticut': { path: 'M 890 145 L 940 145 L 940 160 L 890 160 Z', abbreviation: 'CT' },
  'new-jersey': { path: 'M 880 165 L 910 165 L 910 200 L 880 200 Z', abbreviation: 'NJ' },
  'delaware': { path: 'M 880 205 L 900 205 L 900 225 L 880 225 Z', abbreviation: 'DE' },
  'maryland': { path: 'M 830 205 L 875 205 L 875 230 L 830 230 Z', abbreviation: 'MD' },
};

export default function USMap() {
  const [states, setStates] = useState<State[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStates = async () => {
      try {
        const { data: statesData, error: statesError } = await (supabase as any)
          .from('states')
          .select('id, name, code, slug')
          .order('name');

        if (statesError) throw statesError;

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

  const getStateRanchCount = (slug: string) => {
    const state = states.find(s => s.slug === slug);
    return state?.ranch_count || 0;
  };

  const handleStateClick = (slug: string) => {
    if (getStateRanchCount(slug) > 0) {
      navigate(`/${slug}/dude-ranches`);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Browse by State</CardTitle>
          <CardDescription>Loading interactive map...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Browse Ranches by State
        </CardTitle>
        <CardDescription>
          Click on any state to explore dude ranches in that region
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative w-full max-w-5xl mx-auto">
          <svg 
            viewBox="0 0 1000 500" 
            className="w-full h-auto"
            style={{ maxHeight: '600px' }}
          >
            {/* Background */}
            <rect width="1000" height="500" fill="hsl(var(--muted))" opacity="0.3" />
            
            {/* Render all states */}
            {Object.entries(stateData).map(([slug, data]) => {
              const ranchCount = getStateRanchCount(slug);
              const hasRanches = ranchCount > 0;
              const isHovered = hoveredState === slug;
              
              return (
                <g key={slug}>
                  <path
                    d={data.path}
                    className={`transition-all duration-300 ${
                      hasRanches ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                    style={{
                      fill: hasRanches 
                        ? isHovered 
                          ? 'hsl(var(--accent))' 
                          : 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground))',
                      stroke: 'hsl(var(--background))',
                      strokeWidth: 2,
                      opacity: hasRanches ? (isHovered ? 1 : 0.8) : 0.3,
                      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      transformOrigin: 'center',
                      filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none'
                    }}
                    onMouseEnter={() => hasRanches && setHoveredState(slug)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => handleStateClick(slug)}
                  />
                  {/* State abbreviation label */}
                  {hasRanches && (
                    <text
                      x={data.path.match(/M (\d+)/)?.[1] || '0'}
                      y={data.path.match(/M \d+ (\d+)/)?.[1] || '0'}
                      className="pointer-events-none text-xs font-bold"
                      fill="hsl(var(--primary-foreground))"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {data.abbreviation}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredState && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card border-2 border-primary rounded-lg px-4 py-2 shadow-lg animate-fade-in z-10">
              <div className="flex items-center gap-2">
                <span className="font-semibold capitalize">
                  {hoveredState.replace(/-/g, ' ')}
                </span>
                <Badge variant="secondary">
                  {getStateRanchCount(hoveredState)} ranches
                </Badge>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
              <span className="text-muted-foreground">Available States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: 'hsl(var(--accent))' }}></div>
              <span className="text-muted-foreground">Hover State</span>
            </div>
          </div>
        </div>

        {/* Available states list below map */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-4 text-center">Available Destinations</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {states.map((state) => (
              <Badge
                key={state.id}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => navigate(`/${state.slug}/dude-ranches`)}
              >
                {state.name} ({state.ranch_count})
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
