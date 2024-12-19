import { SDK_CONFIG } from './constants';
import { logger } from './utils/logger';
import { withRetry } from './utils/retry';

export async function verifySdkAvailability(): Promise<{
  available: boolean;
  error?: string;
}> {
  try {
    const response = await withRetry(async () => {
      const res = await fetch(`${SDK_CONFIG.BASE_URL}${SDK_CONFIG.API_PATH}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!res.ok) {
        throw new Error(`SDK health check failed with status ${res.status}`);
      }

      return res;
    }, SDK_CONFIG.MAX_RETRIES, SDK_CONFIG.RETRY_DELAY);

    const data = await response.json();
    logger.info('SDK health check completed successfully', { data });
    
    return { available: true };
  } catch (error) {
    // In development, use mock responses
    if (import.meta.env.DEV) {
      logger.info('Development mode detected, using mock responses');
      return { available: true };
    }

    logger.warn('SDK health check warning', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: 'Using fallback implementation'
    });
    
    return { 
      available: false,
      error: error instanceof Error ? error.message : 'Failed to verify SDK availability'
    };
  }
}

export function loadSDK(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById('articleo-sdk')) {
      logger.info('SDK already loaded');
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'articleo-sdk';
    script.src = `${SDK_CONFIG.BASE_URL}${SDK_CONFIG.API_PATH}/sdk.js`;
    script.async = true;
    
    script.onload = () => {
      logger.info('SDK loaded successfully');
      resolve();
    };

    script.onerror = (error) => {
      logger.warn('SDK load warning - using fallback', { error });
      provideFallbackSDK();
      resolve();
    };

    document.head.appendChild(script);
  });
}

function provideFallbackSDK() {
  window.articleo = window.articleo || function(...args: any[]) {
    logger.info('Articleo SDK fallback call', { args });
  };
}

declare global {
  interface Window {
    articleo: (...args: any[]) => void;
  }
}