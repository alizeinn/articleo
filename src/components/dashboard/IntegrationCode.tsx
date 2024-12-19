import React, { useState } from 'react';
import { IntegrationType } from './integration/types';
import { getScriptCode, getGTMCode } from './integration/constants';
import { CodeDisplay } from './integration/CodeDisplay';
import { GTMInstructions } from './integration/GTMInstructions';
import { TypeSelector } from './integration/TypeSelector';
import { GTMVerificationButton } from './integration/GTMVerificationButton';
import { AutoSiteId } from './integration/AutoSiteId';

export function IntegrationCode() {
  const [copied, setCopied] = useState(false);
  const [integrationType, setIntegrationType] = useState<IntegrationType>('script');
  const [siteId, setSiteId] = useState<string>('');

  const getSelectedCode = () => integrationType === 'script' 
    ? getScriptCode(siteId) 
    : getGTMCode(siteId);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getSelectedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Integration Code</h2>
        <TypeSelector selected={integrationType} onSelect={setIntegrationType} />
      </div>

      <AutoSiteId 
        domain={window.location.hostname} 
        onSiteIdGenerated={setSiteId}
      />

      <div className="space-y-4">
        {integrationType === 'gtm' && (
          <>
            <GTMInstructions />
            {siteId && <GTMVerificationButton siteId={siteId} />}
          </>
        )}
        {siteId && (
          <CodeDisplay 
            code={getSelectedCode()} 
            copied={copied} 
            onCopy={copyToClipboard} 
          />
        )}
      </div>
    </div>
  );
}