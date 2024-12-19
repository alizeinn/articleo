import { SDK_CONFIG, SDK_MOCK_RESPONSES } from './constants';
import { logger } from './utils/logger';
import { SDKTestResult } from './types/sdk';

export async function testSDKEndpoints(): Promise<SDKTestResult[]> {
  // In development, return mock responses
  if (import.meta.env.DEV) {
    return Object.entries(SDK_MOCK_RESPONSES).map(([path, response]) => ({
      endpoint: path,
      success: true,
      message: `${path}: Available`,
      data: response.content
    }));
  }

  const endpoints = [
    { path: '/sdk.js', name: 'SDK Script' },
    { path: '/health', name: 'Health Check' },
    { path: '/version', name: 'Version Info' }
  ];
  
  return Promise.all(endpoints.map(async ({ path, name }) => {
    try {
      const response = await fetch(`${SDK_CONFIG.BASE_URL}${path}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = path === '/sdk.js' 
        ? await response.text()
        : await response.json();

      return {
        endpoint: path,
        success: true,
        message: `${name}: Available`,
        data
      };
    } catch (error) {
      logger.error(`SDK endpoint test failed: ${path}`, error);
      return {
        endpoint: path,
        success: false,
        message: `${name}: Unavailable`,
        error: {
          code: error instanceof Error ? error.name : 'UnknownError',
          details: error instanceof Error ? error.message : 'Unknown error occurred',
          timestamp: new Date().toISOString()
        }
      };
    }
  }));
}