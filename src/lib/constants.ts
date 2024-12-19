export const SDK_CONFIG = {
  BASE_URL: '/api/sdk',
  VERSION: '1.0.0',
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 5000
} as const;

// Mock responses for development
export const SDK_MOCK_RESPONSES = {
  '/api/sdk/health': {
    status: 200,
    content: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'development'
    }
  },
  '/api/sdk/sdk.js': {
    status: 200,
    content: '/* Articleo SDK v1.0.0 */\nconsole.log("Articleo SDK loaded");'
  },
  '/api/sdk/version': {
    status: 200,
    content: {
      version: '1.0.0',
      latest: true,
      releaseDate: new Date().toISOString()
    }
  }
};