import { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    },
    body: JSON.stringify({
      version: '1.0.0',
      latest: true,
      releaseDate: new Date().toISOString()
    })
  };
};