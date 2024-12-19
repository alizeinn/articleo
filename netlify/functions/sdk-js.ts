import { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600'
    },
    body: `/* Articleo SDK v1.0.0 */
(function() {
  window.articleo = window.articleo || function() {
    (window.articuleoQ = window.articuleoQ || []).push(arguments);
  };
})();`
  };
};