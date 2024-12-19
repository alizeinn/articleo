import { SDK_CONFIG } from '../constants';
import { logger } from '../utils/logger';
import { withRetry } from '../utils/retry';

export interface SDKEndpoint {
  path: string;
  method: 'GET' | 'POST';
  contentType: string;
}

export const SDK_ENDPOINTS: Record<string, SDKEndpoint> = {
  health: {
    path: '/health',
    method: 'GET',
    contentType: 'application/json'
  },
  script: {
    path: '/sdk.js',
    method: 'GET',
    contentType: 'application/javascript'
  },
  version: {
    path: '/version',
    method: 'GET',
    contentType: 'application/json'
  }
};

export async function callSDKEndpoint(endpoint: SDKEndpoint): Promise<Response> {
  const url = `${SDK_CONFIG.BASE_URL}${SDK_CONFIG.API_PATH}${endpoint.path}`;
  
  logger.info(`Calling SDK endpoint: ${url}`);
  
  const response = await withRetry(async () => {
    const res = await fetch(url, {
      method: endpoint.method,
      headers: {
        'Accept': endpoint.contentType,
        'X-SDK-Version': SDK_CONFIG.VERSION
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return res;
  }, SDK_CONFIG.MAX_RETRIES, SDK_CONFIG.RETRY_DELAY);

  return response;
}