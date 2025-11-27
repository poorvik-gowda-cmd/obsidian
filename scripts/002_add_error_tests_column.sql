-- Add error_tests column to store generated error test cases
ALTER TABLE api_blueprints 
ADD COLUMN IF NOT EXISTS error_tests JSONB DEFAULT NULL;

-- Add RLS policy if needed
ALTER TABLE api_blueprints ENABLE ROW LEVEL SECURITY;
