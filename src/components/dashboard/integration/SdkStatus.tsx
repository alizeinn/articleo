import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { verifySdkAvailability } from '../../../lib/sdk';

interface Status {
  checking: boolean;
  available: boolean;
  error?: string;
}

export function SdkStatus() {
  const [status, setStatus] = useState<Status>({
    checking: true,
    available: false
  });

  useEffect(() => {
    checkSdkStatus();
  }, []);

  const checkSdkStatus = async () => {
    const result = await verifySdkAvailability();
    setStatus({
      checking: false,
      available: result.available,
      error: result.error
    });
  };

  if (status.checking) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking SDK availability...</span>
      </div>
    );
  }

  if (status.available) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle2 className="w-4 h-4" />
        <span>SDK is available</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-red-600">
      <XCircle className="w-4 h-4" />
      <span>{status.error || 'SDK is not available'}</span>
    </div>
  );
}