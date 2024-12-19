import React, { useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { verifyGTMConnection } from '../../../lib/gtm';

interface GTMVerificationProps {
  siteId: string;
}

export function GTMVerification({ siteId }: GTMVerificationProps) {
  const [status, setStatus] = useState<{
    state: 'idle' | 'checking' | 'success' | 'error';
    message: string;
  }>({
    state: 'idle',
    message: 'Click to verify GTM integration'
  });

  const verifyGTM = async () => {
    if (status.state === 'checking') return;

    setStatus({ 
      state: 'checking', 
      message: 'Verifying GTM integration...' 
    });
    
    try {
      const result = await verifyGTMConnection(siteId);
      
      setStatus({
        state: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Verification failed'
      });
    }
  };

  const StatusIcon = {
    idle: CheckCircle2,
    checking: Loader2,
    success: CheckCircle2,
    error: XCircle
  }[status.state];

  const statusColors = {
    idle: 'text-gray-600',
    checking: 'text-blue-600',
    success: 'text-green-600',
    error: 'text-red-600'
  }[status.state];

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-3">Verify Integration</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={verifyGTM}
          disabled={status.state === 'checking'}
          className={`px-4 py-2 text-white rounded-lg transition-colors ${
            status.state === 'checking'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Verify GTM Setup
        </button>
        <div className={`flex items-center gap-2 ${statusColors}`}>
          <StatusIcon className={`w-5 h-5 ${status.state === 'checking' ? 'animate-spin' : ''}`} />
          <span>{status.message}</span>
        </div>
      </div>
      
      {status.state === 'error' && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">Troubleshooting Steps:</h4>
          <ol className="list-decimal list-inside space-y-2 text-red-700">
            <li>Ensure Google Tag Manager is properly installed</li>
            <li>Verify the Articleo tag is configured in your GTM container</li>
            <li>Check that the site ID matches your configuration</li>
            <li>Confirm the tag trigger is set to fire on all pages</li>
            <li>Clear your browser cache and try again</li>
          </ol>
        </div>
      )}
    </div>
  );
}