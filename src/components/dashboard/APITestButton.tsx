import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type TestType = 'listSites' | 'createSite' | 'listSummaries' | 'createSummary';

interface APITestButtonProps {
  type: TestType;
  siteId?: string;
}

export function APITestButton({ type, siteId }: APITestButtonProps) {
  const [status, setStatus] = useState<{
    state: 'idle' | 'testing' | 'success' | 'error';
    message: string;
    data?: any;
  }>({
    state: 'idle',
    message: 'Click to test API endpoint'
  });

  const testAPI = async () => {
    if (status.state === 'testing') return;

    setStatus({
      state: 'testing',
      message: 'Testing API endpoint...'
    });

    try {
      let result;
      
      switch (type) {
        case 'listSites':
          result = await supabase.from('sites').select('*');
          break;
        case 'createSite':
          result = await supabase.from('sites').insert([{
            domain: 'test.example.com',
            name: 'Test Site'
          }]).select().single();
          break;
        case 'listSummaries':
          if (!siteId) throw new Error('Site ID is required');
          result = await supabase.from('summaries')
            .select('*')
            .eq('site_id', siteId);
          break;
        case 'createSummary':
          if (!siteId) throw new Error('Site ID is required');
          result = await supabase.from('summaries').insert([{
            site_id: siteId,
            url: 'https://example.com/test',
            title: 'Test Article',
            original_content: 'Test content',
            summary: null, // Allow null summary since it will be generated later
            highlights: [] // Default empty array for highlights
          }]).select().single();
          break;
      }

      if (result.error) throw result.error;

      setStatus({
        state: 'success',
        message: 'API test successful',
        data: result.data
      });
    } catch (error) {
      console.error('API test error:', error);
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Test failed'
      });
    }
  };

  const StatusIcon = {
    idle: Play,
    testing: Loader2,
    success: CheckCircle2,
    error: XCircle
  }[status.state];

  const statusColors = {
    idle: 'text-gray-600',
    testing: 'text-blue-600',
    success: 'text-green-600',
    error: 'text-red-600'
  }[status.state];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={testAPI}
          disabled={status.state === 'testing'}
          className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
            status.state === 'testing'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <StatusIcon className={`w-4 h-4 ${status.state === 'testing' ? 'animate-spin' : ''}`} />
          Test {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </button>
        <span className={statusColors}>{status.message}</span>
      </div>

      {status.state === 'success' && status.data && (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(status.data, null, 2)}
        </pre>
      )}

      {status.state === 'error' && (
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          <p className="font-medium">Error Details:</p>
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
}