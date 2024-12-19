import { supabase } from './supabase';
import { normalizeUrl } from './utils/url';

export async function getSiteId(domain: string): Promise<string> {
  try {
    const normalizedDomain = normalizeUrl(domain);

    // Check existing site
    const { data: existingSite } = await supabase
      .from('sites')
      .select('site_key')
      .eq('domain', normalizedDomain)
      .maybeSingle();

    if (existingSite?.site_key) {
      return existingSite.site_key;
    }

    // Create new site
    const { data: newSite, error: insertError } = await supabase
      .from('sites')
      .insert([{ 
        domain: normalizedDomain,
        name: normalizedDomain,
        site_key: crypto.randomUUID(),
        user_id: null // Explicitly set as null for anonymous sites
      }])
      .select('site_key')
      .single();

    if (insertError) {
      throw new Error('Failed to create site ID');
    }

    return newSite.site_key;
  } catch (error) {
    console.error('Error getting site ID:', error);
    throw new Error('Failed to generate site ID');
  }
}