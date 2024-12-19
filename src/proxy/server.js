import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Mock SDK endpoints
app.get('/api/sdk/sdk.js', (req, res) => {
  res.type('application/javascript').send('/* Articleo SDK v1.0.0 */\nconsole.log("Articleo SDK loaded");');
});

app.get('/api/sdk/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'development'
  });
});

app.get('/api/sdk/version', (req, res) => {
  res.json({
    version: '1.0.0',
    latest: true,
    releaseDate: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Mock SDK server running on port ${PORT}`);
});