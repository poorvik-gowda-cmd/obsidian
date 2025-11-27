-- Create api_blueprints table
CREATE TABLE IF NOT EXISTS public.api_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  parsed_json JSONB NOT NULL,
  ai_insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.api_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - can be restricted later)
CREATE POLICY "Allow all access to api_blueprints" ON public.api_blueprints
  FOR ALL USING (true) WITH CHECK (true);
