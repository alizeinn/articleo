import React from 'react';
import { Check, Copy } from 'lucide-react';
import { SdkStatus } from './SdkStatus';

interface CodeDisplayProps {
  code: string;
  copied: boolean;
  onCopy: () => void;
}

export function CodeDisplay({ code, copied, onCopy }: CodeDisplayProps) {
  return (
    <div className="space-y-4">
      <SdkStatus />
      <div className="relative">
        <div className="absolute right-2 top-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}