import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/javascript'
      }
    };
  }

  try {
    const sdkContent = `
      // Articleo SDK v1.0.0
      (function(window) {
        window.Articleo = {
          init: function(config) {
            console.log('Articleo SDK initialized', config);
          },
          track: function(event, properties) {
            console.log('Event tracked:', event, properties);
          }
        };
      })(window);
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      },
      body: sdkContent
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};