// SDK Proxy Server Configuration
export const PROXY_CONFIG = {
  port: process.env.PORT || 3001,
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-SDK-Version']
  },
  endpoints: {
    base: '/api/sdk',
    script: '/sdk.js',
    health: '/health',
    version: '/version'
  },
  mock: {
    script: '/* Articleo SDK v1.0.0 */\nconsole.log("Articleo SDK loaded");',
    health: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'development'
    },
    version: {
      version: '1.0.0',
      latest: true,
      releaseDate: new Date().toISOString()
    }
  }
} as const;