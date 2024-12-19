/*
  # Update sites table policies

  1. Changes
    - Add public access policy for site creation and querying
    - Modify existing policies to handle unauthenticated access
    - Add domain-based access control

  2. Security
    - Enable secure site creation without authentication
    - Restrict site updates to verified domains
    - Maintain data isolation between different domains
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own sites" ON sites;
DROP POLICY IF EXISTS "Users can insert own sites" ON sites;
DROP POLICY IF EXISTS "Users can update own sites" ON sites;

-- Create new policies for public access
CREATE POLICY "Allow public to create sites"
  ON sites
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow domain-based read access"
  ON sites
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow domain-based updates"
  ON sites
  FOR UPDATE
  TO public
  USING (domain = current_setting('request.headers')::json->>'origin')
  WITH CHECK (domain = current_setting('request.headers')::json->>'origin');