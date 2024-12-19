import React, { useState } from 'react';
import { APITestButton } from './APITestButton';
import { SDKTestButton } from './SDKTestButton';

export function APITesting() {
  const [siteId, setSiteId] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">API Testing</h2>
        <p className="text-gray-600 mb-6">
          Test your API endpoints and SDK availability directly from the dashboard.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-3">SDK Endpoints</h3>
          <SDKTestButton />
        </div>

        <div>
          <h3 className="text-md font-medium mb-3">Sites</h3>
          <div className="space-y-4">
            <APITestButton type="listSites" />
            <APITestButton type="createSite" />
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-3">Summaries</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site ID
            </label>
            <input
              type="text"
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              placeholder="Enter site ID for summary operations"
              className="px-3 py-2 border rounded-lg w-full max-w-md"
            />
          </div>
          <div className="space-y-4">
            <APITestButton type="listSummaries" siteId={siteId} />
            <APITestButton type="createSummary" siteId={siteId} />
          </div>
        </div>
      </div>
    </div>
  );
}