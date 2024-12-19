import { Handler } from '@netlify/functions';

const mockResponses = {
  '/sdk.js': {
    content: '/* Articleo SDK v1.0.0 */\nconsole.log("Articleo SDK loaded");',
    contentType: 'application/javascript'
  },
  '/health': {
    content: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'production'
    },
    contentType: 'application/json'
  },
  '/version': {
    content: {
      version: '1.0.0',
      latest: true,
      releaseDate: new Date().toISOString()
    },
    contentType: 'application/json'
  }
};

export const handler: Handler = async (event) => {
  // Get the endpoint from the path
  const endpoint = event.path.replace('/.netlify/functions/sdk', '');
  
  // Find matching response
  const response = mockResponses[endpoint];
  
  if (!response) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': response.contentType,
      'Cache-Control': 'public, max-age=300'
    },
    body: typeof response.content === 'string' 
      ? response.content 
      : JSON.stringify(response.content)
  };
};