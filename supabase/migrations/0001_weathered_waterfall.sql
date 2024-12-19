/*
  # Initial Schema Setup for Articleo.ai

  1. New Tables
    - `sites`
      - Stores registered websites using Articleo.ai
      - Contains site configuration and API keys
    - `summaries`
      - Stores article summaries and analytics
    - `users`
      - Stores user information and preferences
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Sites table
CREATE TABLE sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  domain text NOT NULL,
  site_key text UNIQUE DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  UNIQUE(user_id, domain)
);

-- Summaries table
CREATE TABLE summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites NOT NULL,
  url text NOT NULL,
  title text NOT NULL,
  original_content text NOT NULL,
  summary text NOT NULL,
  highlights jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  view_count integer DEFAULT 0,
  UNIQUE(site_id, url)
);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Policies for sites
CREATE POLICY "Users can read own sites"
  ON sites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sites"
  ON sites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sites"
  ON sites
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for summaries
CREATE POLICY "Users can read own site summaries"
  ON summaries
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = summaries.site_id
    AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert summaries for own sites"
  ON summaries
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = summaries.site_id
    AND sites.user_id = auth.uid()
  ));

CREATE POLICY "Users can update summaries for own sites"
  ON summaries
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = summaries.site_id
    AND sites.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM sites
    WHERE sites.id = summaries.site_id
    AND sites.user_id = auth.uid()
  ));