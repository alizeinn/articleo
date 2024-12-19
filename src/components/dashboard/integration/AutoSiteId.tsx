import React, { useEffect, useState } from 'react';
import { getSiteId } from '../../../lib/site-id';
import { Loader2 } from 'lucide-react';

interface AutoSiteIdProps {
  domain: string;
  onSiteIdGenerated: (siteId: string) => void;
}

export function AutoSiteId({ domain, onSiteIdGenerated }: AutoSiteIdProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        const siteId = await getSiteId(domain);
        if (mounted) {
          onSiteIdGenerated(siteId);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to generate site ID');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, [domain, onSiteIdGenerated]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Generating site ID...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
        Error: {error}
      </div>
    );
  }

  return null;
}