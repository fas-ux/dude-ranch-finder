import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Ranch {
  name: string;
  state: string;
  city: string;
  description: string;
  website?: string;
  phone?: string;
  address?: string;
  amenities?: string[];
  price_band?: string;
}

async function scrapeDudeRanchOrg(): Promise<Ranch[]> {
  console.log('Scraping duderanch.org...');
  const ranches: Ranch[] = [];
  
  try {
    const response = await fetch('https://www.duderanch.org/find-dude-ranch/');
    const html = await response.text();
    
    // Parse HTML to extract ranch listings
    // This is a simplified version - real scraping would need more robust parsing
    const ranchPattern = /<div class="ranch-listing"[^>]*>([\s\S]*?)<\/div>/gi;
    const matches = html.matchAll(ranchPattern);
    
    for (const match of matches) {
      const content = match[1];
      const nameMatch = content.match(/<h3[^>]*>(.*?)<\/h3>/i);
      const stateMatch = content.match(/State:\s*([^<]+)/i);
      const cityMatch = content.match(/City:\s*([^<]+)/i);
      const descMatch = content.match(/<p[^>]*>(.*?)<\/p>/i);
      
      if (nameMatch) {
        ranches.push({
          name: nameMatch[1].trim(),
          state: stateMatch?.[1].trim() || '',
          city: cityMatch?.[1].trim() || '',
          description: descMatch?.[1].trim() || '',
          website: '',
        });
      }
    }
  } catch (error) {
    console.error('Error scraping duderanch.org:', error);
  }
  
  return ranches;
}

async function scrapeDudeRanchCom(): Promise<Ranch[]> {
  console.log('Scraping duderanch.com...');
  const ranches: Ranch[] = [];
  
  try {
    const response = await fetch('https://www.duderanch.com/ranches/');
    const html = await response.text();
    
    // Parse HTML to extract ranch listings
    const ranchPattern = /<article[^>]*class="[^"]*ranch[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;
    const matches = html.matchAll(ranchPattern);
    
    for (const match of matches) {
      const content = match[1];
      const nameMatch = content.match(/<h2[^>]*>(.*?)<\/h2>/i);
      const stateMatch = content.match(/State:\s*([^<]+)/i);
      const locationMatch = content.match(/Location:\s*([^<]+)/i);
      const descMatch = content.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/div>/i);
      
      if (nameMatch) {
        ranches.push({
          name: nameMatch[1].trim(),
          state: stateMatch?.[1].trim() || '',
          city: locationMatch?.[1].trim() || '',
          description: descMatch?.[1].trim() || '',
          website: '',
        });
      }
    }
  } catch (error) {
    console.error('Error scraping duderanch.com:', error);
  }
  
  return ranches;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting ranch scraping from both sites...');

    // Scrape both sites in parallel
    const [orgRanches, comRanches] = await Promise.all([
      scrapeDudeRanchOrg(),
      scrapeDudeRanchCom()
    ]);

    const allRanches = [...orgRanches, ...comRanches];
    console.log(`Found ${allRanches.length} ranches total`);

    let insertedCount = 0;
    let errorCount = 0;

    // Process each ranch
    for (const ranch of allRanches) {
      try {
        // Get or create state
        let stateId: string;
        const { data: existingState } = await supabase
          .from('states')
          .select('id')
          .eq('name', ranch.state)
          .single();

        if (existingState) {
          stateId = existingState.id;
        } else {
          const stateSlug = ranch.state.toLowerCase().replace(/\s+/g, '-');
          const stateCode = ranch.state.substring(0, 2).toUpperCase();
          
          const { data: newState, error: stateError } = await supabase
            .from('states')
            .insert({
              name: ranch.state,
              code: stateCode,
              slug: stateSlug
            })
            .select('id')
            .single();

          if (stateError) throw stateError;
          stateId = newState.id;
        }

        // Insert ranch
        const ranchSlug = ranch.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const { error: ranchError } = await supabase
          .from('ranches')
          .insert({
            name: ranch.name,
            slug: ranchSlug,
            state_id: stateId,
            city: ranch.city,
            description: ranch.description,
            website: ranch.website,
            phone: ranch.phone,
            address: ranch.address,
            price_band: ranch.price_band,
            amenities: ranch.amenities || []
          });

        if (ranchError) {
          console.error(`Error inserting ${ranch.name}:`, ranchError);
          errorCount++;
        } else {
          insertedCount++;
        }
      } catch (error) {
        console.error(`Error processing ranch ${ranch.name}:`, error);
        errorCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraping complete. Inserted ${insertedCount} ranches, ${errorCount} errors.`,
        total: allRanches.length,
        inserted: insertedCount,
        errors: errorCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in scrape-ranches function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
