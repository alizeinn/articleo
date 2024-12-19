import React from 'react';
import { AlertCircle } from 'lucide-react';

export function GTMInstructions() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">GTM Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>In Google Tag Manager, create a new Custom HTML tag</li>
          <li>Copy and paste the code above into the Custom HTML tag</li>
          <li>Set the trigger to fire on "All Pages"</li>
          <li>Save and publish your GTM container</li>
          <li>Click the "Verify GTM Setup" button below to confirm the integration</li>
        </ol>
      </div>
      
      <div className="flex gap-2 p-4 bg-blue-50 text-blue-800 rounded-lg">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Important Notes:</p>
          <ul className="mt-1 list-disc list-inside space-y-1">
            <li>Ensure GTM base code is installed before the closing &lt;/body&gt; tag</li>
            <li>The Articleo tag should load after GTM initialization</li>
            <li>Clear browser cache if changes don't appear immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}