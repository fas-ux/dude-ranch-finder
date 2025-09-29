-- Create states table
CREATE TABLE IF NOT EXISTS public.states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create ranches table
CREATE TABLE IF NOT EXISTS public.ranches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id UUID REFERENCES states(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  description TEXT,
  price_band TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranches ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "States are publicly readable" ON public.states FOR SELECT USING (true);
CREATE POLICY "Ranches are publicly readable" ON public.ranches FOR SELECT USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS ranches_slug_idx ON ranches(slug);
CREATE INDEX IF NOT EXISTS ranches_state_id_idx ON ranches(state_id);
CREATE INDEX IF NOT EXISTS states_slug_idx ON states(slug);

-- Insert sample states
INSERT INTO public.states (name, code, slug) VALUES 
('Montana', 'MT', 'montana'),
('Wyoming', 'WY', 'wyoming'),
('Colorado', 'CO', 'colorado'),
('Texas', 'TX', 'texas'),
('Arizona', 'AZ', 'arizona'),
('New Mexico', 'NM', 'new-mexico'),
('Nevada', 'NV', 'nevada'),
('Utah', 'UT', 'utah'),
('Idaho', 'ID', 'idaho'),
('South Dakota', 'SD', 'south-dakota')
ON CONFLICT (slug) DO NOTHING;