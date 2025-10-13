import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import credentialRoutes from './routes/credentials';
import { getWorkerId } from './utils/workerId';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', credentialRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Credential Issuance API',
    workerId: getWorkerId(),
    status: 'running',
    endpoints: {
      issue: 'POST /api/issue',
      health: 'GET /api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Issuance API running on port ${PORT}`);
  console.log(`📦 Worker ID: ${getWorkerId()}`);
  console.log(`🔗 http://localhost:${PORT}`);
});