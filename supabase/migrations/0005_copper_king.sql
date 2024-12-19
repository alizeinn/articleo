/*
  # Update Summaries Table Schema

  1. Changes
    - Make summary column nullable since it's generated after creation
    - Add default empty string for highlights
  
  2. Notes
    - This allows creating summaries without an initial summary text
    - Highlights default to empty array for consistency
*/

ALTER TABLE summaries 
  ALTER COLUMN summary DROP NOT NULL,
  ALTER COLUMN highlights SET DEFAULT '[]'::jsonb;