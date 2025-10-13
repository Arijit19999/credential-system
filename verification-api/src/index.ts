import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Create data directory first
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Created data directory');
}

// Import routes after data directory is created
import verifyRoutes from './routes/verify';
import { getWorkerId } from './utils/workerId';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', verifyRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Credential Verification API',
    workerId: getWorkerId(),
    status: 'running',
    endpoints: {
      verify: 'POST /api/verify',
      verifications: 'GET /api/verifications',
      history: 'GET /api/verifications/:credentialId',
      health: 'GET /api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Verification API running on port ${PORT}`);
  console.log(`📦 Worker ID: ${getWorkerId()}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`💾 Database: ${path.join(dataDir, 'verifications.db')}`);
});