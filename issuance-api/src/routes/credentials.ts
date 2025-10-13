import { Router, Request, Response } from 'express';
import { credentialExists, saveCredential, Credential } from '../database';
import { getWorkerId } from '../utils/workerId';
import { CredentialRecord } from '../database'; 


const router = Router();

// POST /api/issue - Issue a new credential
router.post('/issue', (req: Request, res: Response) => {
  try {
    const credential: Credential = req.body;

    // Validate credential data
    if (!credential || !credential.id || !credential.name || !credential.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credential data. Required fields: id, name, email'
      });
    }

    // Check if credential already exists
    if (credentialExists(credential.id)) {
      return res.status(200).json({
        success: false,
        message: 'Credential already issued',
        credentialId: credential.id
      });
    }

    // Issue new credential
    const workerId = getWorkerId();
    saveCredential(credential, workerId);

    return res.status(201).json({
      success: true,
      message: `credential issued by ${workerId}`,
      workerId: workerId,
      credentialId: credential.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error issuing credential:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/health - Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    workerId: getWorkerId(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/credentials - Get all issued credentials (for debugging)
router.get('/credentials', (req: Request, res: Response) => {
  try {
    const { getAllCredentials } = require('../database');
    const credentials = getAllCredentials();
    
    return res.json({
      success: true,
      count: credentials.length,
      credentials: credentials.map((cred: CredentialRecord) => ({
        ...cred,
        credential_data: JSON.parse(cred.credential_data)
      }))
    });
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;