import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function useSummaries(siteId: string) {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (siteId) {
      loadSummaries();
    }
  }, [siteId]);

  async function loadSummaries() {
    try {
      const data = await api.summaries.list(siteId);
      setSummaries(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load summaries'));
    } finally {
      setLoading(false);
    }
  }

  async function createSummary(url: string, title: string, originalContent: string) {
    try {
      const summary = await api.summaries.create(siteId, {
        url,
        title,
        originalContent,
      });
      setSummaries([summary, ...summaries]);
      return summary;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create summary');
    }
  }

  return {
    summaries,
    loading,
    error,
    createSummary,
    refresh: loadSummaries,
  };
}