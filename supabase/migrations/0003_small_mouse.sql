/*
  # Make user_id optional in sites table

  1. Changes
    - Make user_id column nullable
    - Add default NULL value
    - Update existing policies

  2. Security
    - Maintain RLS policies
    - Allow anonymous site creation
    - Preserve existing data integrity
*/

-- Make user_id nullable
ALTER TABLE sites 
  ALTER COLUMN user_id DROP NOT NULL;

-- Update existing policies to handle NULL user_id
DROP POLICY IF EXISTS "Allow public to create sites" ON sites;
CREATE POLICY "Allow public to create sites"
  ON sites
  FOR INSERT
  TO public
  WITH CHECK (
    user_id IS NULL OR 
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Allow domain-based read access" ON sites;
CREATE POLICY "Allow domain-based read access"
  ON sites
  FOR SELECT
  TO public
  USING (
    user_id IS NULL OR 
    user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Allow domain-based updates" ON sites;
CREATE POLICY "Allow domain-based updates"
  ON sites
  FOR UPDATE
  TO public
  USING (
    (user_id IS NULL AND domain = current_setting('request.headers')::json->>'origin') OR
    user_id = auth.uid()
  )
  WITH CHECK (
    (user_id IS NULL AND domain = current_setting('request.headers')::json->>'origin') OR
    user_id = auth.uid()
  );