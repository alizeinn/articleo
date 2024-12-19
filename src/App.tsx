import React from 'react';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Stats } from './components/dashboard/Stats';
import { IntegrationCode } from './components/dashboard/IntegrationCode';
import { APITesting } from './components/dashboard/APITesting';

function App() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Monitor your Articleo.ai integration and performance metrics
          </p>
        </div>

        <Stats />
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <IntegrationCode />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <APITesting />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Start Guide</h2>
          <ol className="space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              <div>
                <p className="font-medium text-gray-900">Copy the integration code</p>
                <p>Copy the code snippet above and paste it into your website's &lt;head&gt; tag.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              <div>
                <p className="font-medium text-gray-900">Initialize the SDK</p>
                <p>Replace YOUR_SITE_ID with your unique identifier from the settings page.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              <div>
                <p className="font-medium text-gray-900">Test the integration</p>
                <p>Visit your website and ensure the Articleo.ai features are working correctly.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;