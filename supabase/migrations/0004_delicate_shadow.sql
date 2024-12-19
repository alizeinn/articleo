/*
  # Update Summaries RLS Policies

  1. Changes
    - Allow public access to summaries table
    - Remove user-based restrictions
    - Enable anonymous operations

  2. Security
    - Enable RLS on summaries table
    - Add policies for public access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own site summaries" ON summaries;
DROP POLICY IF EXISTS "Users can insert summaries for own sites" ON summaries;
DROP POLICY IF EXISTS "Users can update summaries for own sites" ON summaries;

-- Create new policies for public access
CREATE POLICY "Allow public to create summaries"
  ON summaries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to read summaries"
  ON summaries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to update summaries"
  ON summaries
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);