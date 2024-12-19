import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { testSDKEndpoints, SDKTestResult } from '../../lib/sdk-tests';
import { logger } from '../../lib/utils/logger';

export function SDKTestButton() {
  const [status, setStatus] = useState<{
    state: 'idle' | 'testing' | 'success' | 'error';
    message: string;
    results?: SDKTestResult[];
  }>({
    state: 'idle',
    message: 'Click to test SDK endpoints'
  });

  const testSDK = async () => {
    if (status.state === 'testing') return;

    setStatus({
      state: 'testing',
      message: 'Testing SDK endpoints...'
    });

    try {
      const results = await testSDKEndpoints();
      const allSuccess = results.every(r => r.success);
      
      setStatus({
        state: allSuccess ? 'success' : 'error',
        message: allSuccess ? 'All SDK endpoints available' : 'Some endpoints failed',
        results
      });

      // Log test completion
      logger.info('SDK test completed', {
        success: allSuccess,
        results: results.map(r => ({
          endpoint: r.message.split(':')[0],
          success: r.success,
          error: r.error
        }))
      });
    } catch (error) {
      logger.error('SDK test failed', { error });
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'SDK test failed'
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
          onClick={testSDK}
          disabled={status.state === 'testing'}
          className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
            status.state === 'testing'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <StatusIcon className={`w-4 h-4 ${status.state === 'testing' ? 'animate-spin' : ''}`} />
          Test SDK Endpoints
        </button>
        <span className={statusColors}>{status.message}</span>
      </div>

      {status.results && (
        <div className="space-y-2">
          {status.results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                result.success ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                  {result.error && (
                    <div className="mt-2 text-sm text-red-600">
                      <p><strong>Error Code:</strong> {result.error.code}</p>
                      <p><strong>Details:</strong> {result.error.details}</p>
                      <p><strong>Time:</strong> {new Date(result.error.timestamp).toLocaleString()}</p>
                    </div>
                  )}
                  {result.data && (
                    <pre className="mt-2 text-sm overflow-x-auto p-2 bg-white bg-opacity-50 rounded">
                      {typeof result.data === 'string' && result.data.length > 100
                        ? result.data.substring(0, 100) + '...'
                        : JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}