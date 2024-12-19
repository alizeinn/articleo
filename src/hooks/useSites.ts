import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function useSites() {
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSites();
  }, []);

  async function loadSites() {
    try {
      const data = await api.sites.list();
      setSites(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load sites'));
    } finally {
      setLoading(false);
    }
  }

  async function createSite(domain: string, name: string) {
    try {
      const site = await api.sites.create({ domain, name });
      setSites([site, ...sites]);
      return site;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create site');
    }
  }

  return {
    sites,
    loading,
    error,
    createSite,
    refresh: loadSites,
  };
}