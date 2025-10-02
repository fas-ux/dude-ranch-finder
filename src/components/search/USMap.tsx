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

// Accurate US state SVG paths and positions
const statePathsData: Record<string, { d: string; labelX: number; labelY: number }> = {
  'alabama': { d: 'M 771 345 L 790 345 L 795 415 L 770 415 L 765 370 Z', labelX: 780, labelY: 380 },
  'arizona': { d: 'M 170 280 L 235 265 L 250 385 L 185 400 Z', labelX: 210, labelY: 340 },
  'arkansas': { d: 'M 620 330 L 695 330 L 695 390 L 620 390 Z', labelX: 657, labelY: 360 },
  'california': { d: 'M 65 190 L 115 175 L 145 165 L 160 230 L 155 300 L 145 370 L 115 420 L 85 410 L 75 350 L 70 280 Z', labelX: 110, labelY: 300 },
  'colorado': { d: 'M 280 220 L 390 220 L 390 300 L 280 300 Z', labelX: 335, labelY: 260 },
  'connecticut': { d: 'M 875 185 L 905 185 L 905 200 L 875 200 Z', labelX: 890, labelY: 192 },
  'delaware': { d: 'M 860 225 L 870 225 L 870 245 L 860 245 Z', labelX: 865, labelY: 235 },
  'florida': { d: 'M 810 435 L 830 425 L 855 450 L 860 490 L 840 510 L 810 495 L 800 470 L 795 445 Z', labelX: 830, labelY: 465 },
  'georgia': { d: 'M 795 350 L 830 350 L 835 430 L 800 430 Z', labelX: 815, labelY: 390 },
  'idaho': { d: 'M 195 90 L 225 75 L 245 85 L 250 155 L 240 190 L 225 200 L 200 180 L 195 120 Z', labelX: 225, labelY: 140 },
  'illinois': { d: 'M 685 225 L 720 225 L 725 320 L 690 330 L 685 280 Z', labelX: 705, labelY: 275 },
  'indiana': { d: 'M 725 230 L 755 230 L 760 310 L 725 315 Z', labelX: 742, labelY: 270 },
  'iowa': { d: 'M 600 205 L 675 205 L 675 250 L 600 250 Z', labelX: 637, labelY: 227 },
  'kansas': { d: 'M 475 285 L 620 285 L 620 340 L 475 340 Z', labelX: 547, labelY: 312 },
  'kentucky': { d: 'M 725 320 L 810 310 L 820 340 L 750 350 L 725 345 Z', labelX: 770, labelY: 330 },
  'louisiana': { d: 'M 620 395 L 695 395 L 695 445 L 665 455 L 620 445 Z', labelX: 657, labelY: 420 },
  'maine': { d: 'M 900 90 L 920 85 L 935 95 L 935 135 L 915 145 L 900 135 Z', labelX: 917, labelY: 115 },
  'maryland': { d: 'M 820 245 L 860 240 L 865 265 L 825 270 Z', labelX: 842, labelY: 255 },
  'massachusetts': { d: 'M 875 165 L 925 160 L 930 180 L 880 185 Z', labelX: 902, labelY: 172 },
  'michigan': { d: 'M 730 155 L 770 150 L 780 175 L 780 215 L 760 230 L 735 225 L 730 190 Z M 745 125 L 765 120 L 770 145 L 750 150 Z', labelX: 755, labelY: 185 },
  'minnesota': { d: 'M 580 115 L 670 110 L 675 200 L 600 200 L 595 155 L 580 145 Z', labelX: 625, labelY: 155 },
  'mississippi': { d: 'M 695 335 L 725 335 L 730 430 L 695 435 Z', labelX: 712, labelY: 385 },
  'missouri': { d: 'M 620 255 L 690 255 L 695 325 L 620 325 Z', labelX: 657, labelY: 290 },
  'montana': { d: 'M 250 80 L 420 80 L 420 155 L 250 155 Z', labelX: 335, labelY: 117 },
  'nebraska': { d: 'M 395 210 L 595 210 L 595 280 L 395 280 Z', labelX: 495, labelY: 245 },
  'nevada': { d: 'M 150 170 L 175 165 L 195 260 L 165 285 L 155 235 Z', labelX: 172, labelY: 220 },
  'new-hampshire': { d: 'M 900 140 L 915 135 L 920 170 L 905 175 Z', labelX: 910, labelY: 157 },
  'new-jersey': { d: 'M 850 215 L 865 210 L 870 245 L 855 250 Z', labelX: 860, labelY: 230 },
  'new-mexico': { d: 'M 280 305 L 390 305 L 390 425 L 280 425 Z', labelX: 335, labelY: 365 },
  'new-york': { d: 'M 820 155 L 900 145 L 905 195 L 860 205 L 820 185 Z', labelX: 860, labelY: 175 },
  'north-carolina': { d: 'M 800 315 L 875 305 L 880 345 L 835 355 L 800 350 Z', labelX: 840, labelY: 330 },
  'north-dakota': { d: 'M 420 85 L 580 85 L 580 150 L 420 150 Z', labelX: 500, labelY: 117 },
  'ohio': { d: 'M 760 215 L 810 205 L 820 270 L 785 280 L 760 270 Z', labelX: 790, labelY: 245 },
  'oklahoma': { d: 'M 475 345 L 620 345 L 620 405 L 475 405 Z', labelX: 547, labelY: 375 },
  'oregon': { d: 'M 115 120 L 200 105 L 205 175 L 155 185 L 120 180 Z', labelX: 160, labelY: 150 },
  'pennsylvania': { d: 'M 795 190 L 870 180 L 875 225 L 810 235 Z', labelX: 832, labelY: 207 },
  'rhode-island': { d: 'M 920 175 L 930 175 L 930 185 L 920 185 Z', labelX: 925, labelY: 180 },
  'south-carolina': { d: 'M 830 345 L 870 340 L 875 380 L 840 385 Z', labelX: 852, labelY: 362 },
  'south-dakota': { d: 'M 420 155 L 595 155 L 595 205 L 420 205 Z', labelX: 507, labelY: 180 },
  'tennessee': { d: 'M 695 335 L 795 325 L 800 355 L 695 365 Z', labelX: 747, labelY: 345 },
  'texas': { d: 'M 475 410 L 620 410 L 620 520 L 565 530 L 520 510 L 490 480 L 475 450 Z', labelX: 547, labelY: 470 },
  'utah': { d: 'M 235 190 L 280 190 L 280 305 L 235 305 Z', labelX: 257, labelY: 247 },
  'vermont': { d: 'M 885 140 L 900 135 L 905 170 L 890 175 Z', labelX: 895, labelY: 157 },
  'virginia': { d: 'M 805 280 L 870 270 L 880 305 L 820 315 Z', labelX: 842, labelY: 292 },
  'washington': { d: 'M 115 75 L 205 60 L 210 115 L 120 125 Z', labelX: 160, labelY: 95 },
  'west-virginia': { d: 'M 785 245 L 820 240 L 830 285 L 795 295 Z', labelX: 807, labelY: 267 },
  'wisconsin': { d: 'M 675 155 L 730 150 L 735 220 L 680 225 Z', labelX: 705, labelY: 187 },
  'wyoming': { d: 'M 250 160 L 390 160 L 390 215 L 250 215 Z', labelX: 320, labelY: 187 },
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

  const getStateName = (slug: string) => {
    const state = states.find(s => s.slug === slug);
    return state?.name || slug.replace(/-/g, ' ').toUpperCase();
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
    <Card className="overflow-hidden shadow-warm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="h-6 w-6" />
          Browse Ranches by State
        </CardTitle>
        <CardDescription className="text-base">
          Click on any state to explore dude ranches in that region
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-[hsl(200,50%,80%)] to-[hsl(190,45%,75%)] rounded-xl p-8 shadow-lg">
          <svg 
            viewBox="0 0 960 600" 
            className="w-full h-auto"
            style={{ maxHeight: '700px' }}
          >
            {/* Ocean/Water background gradient */}
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(200, 50%, 80%)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(190, 45%, 75%)', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
              <filter id="hoverShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.4"/>
              </filter>
            </defs>

            {/* Background */}
            <rect width="960" height="600" fill="url(#oceanGradient)" />
            
            {/* Render all states */}
            {Object.entries(statePathsData).map(([slug, data]) => {
              const ranchCount = getStateRanchCount(slug);
              const hasRanches = ranchCount > 0;
              const isHovered = hoveredState === slug;
              const stateName = getStateName(slug);
              
              return (
                <g 
                  key={slug}
                  className="state-group"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor: hasRanches ? 'pointer' : 'not-allowed',
                  }}
                >
                  <path
                    d={data.d}
                    style={{
                      fill: hasRanches 
                        ? isHovered 
                          ? 'hsl(var(--accent))' 
                          : 'hsl(35, 30%, 92%)'
                        : 'hsl(35, 15%, 85%)',
                      stroke: hasRanches ? 'hsl(25, 45%, 35%)' : 'hsl(25, 20%, 60%)',
                      strokeWidth: isHovered ? 3 : 2,
                      opacity: hasRanches ? 1 : 0.5,
                      filter: isHovered ? 'url(#hoverShadow)' : 'url(#shadow)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={() => hasRanches && setHoveredState(slug)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => handleStateClick(slug)}
                  />
                  
                  {/* State name label */}
                  <text
                    x={data.labelX}
                    y={data.labelY}
                    className="pointer-events-none font-bold select-none"
                    style={{
                      fill: hasRanches ? 'hsl(25, 20%, 15%)' : 'hsl(25, 15%, 50%)',
                      fontSize: slug === 'texas' || slug === 'california' || slug === 'montana' ? '16px' : 
                                slug === 'rhode-island' || slug === 'delaware' || slug === 'connecticut' ? '6px' : '10px',
                      fontWeight: isHovered ? 'bold' : '600',
                      textAnchor: 'middle',
                      dominantBaseline: 'middle',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {stateName.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredState && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card border-2 border-primary rounded-lg px-6 py-3 shadow-hero animate-fade-in z-10">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg capitalize">
                  {getStateName(hoveredState)}
                </span>
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {getStateRanchCount(hoveredState)} {getStateRanchCount(hoveredState) === 1 ? 'Ranch' : 'Ranches'}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Legend and available states */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border-2 border-[hsl(25,45%,35%)]" style={{ backgroundColor: 'hsl(35, 30%, 92%)' }}></div>
              <span className="text-muted-foreground font-medium">Available States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border-2 border-[hsl(25,45%,35%)]" style={{ backgroundColor: 'hsl(var(--accent))' }}></div>
              <span className="text-muted-foreground font-medium">Hover</span>
            </div>
          </div>

          {/* Available states badges */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-semibold text-lg mb-4 text-center">Available Ranch Destinations</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {states.map((state) => (
                <Badge
                  key={state.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all px-4 py-2 text-sm font-medium hover-scale"
                  onClick={() => navigate(`/${state.slug}/dude-ranches`)}
                >
                  {state.name} ({state.ranch_count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
