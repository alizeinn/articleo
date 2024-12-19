import express from 'express';
import cors from 'cors';
import { PROXY_CONFIG } from './config';

const app = express();

// Enable CORS
app.use(cors(PROXY_CONFIG.cors));

// SDK endpoints
app.get(`${PROXY_CONFIG.endpoints.base}${PROXY_CONFIG.endpoints.script}`, (req, res) => {
  res.type('application/javascript').send(PROXY_CONFIG.mock.script);
});

app.get(`${PROXY_CONFIG.endpoints.base}${PROXY_CONFIG.endpoints.health}`, (req, res) => {
  res.json({
    ...PROXY_CONFIG.mock.health,
    timestamp: new Date().toISOString()
  });
});

app.get(`${PROXY_CONFIG.endpoints.base}${PROXY_CONFIG.endpoints.version}`, (req, res) => {
  res.json({
    ...PROXY_CONFIG.mock.version,
    releaseDate: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

const PORT = PROXY_CONFIG.port;

app.listen(PORT, () => {
  console.log(`Mock SDK server running on port ${PORT}`);
});