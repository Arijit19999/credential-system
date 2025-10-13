import { Router, Request, Response } from 'express';
import { logVerification, getVerificationHistory, getAllVerifications, VerificationLog } from '../database';
import { getWorkerId } from '../utils/workerId';
import { checkCredentialInIssuanceDB } from '../utils/issuanceClient';

const router = Router();

// POST /api/verify - Verify a credential
router.post('/verify', (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Credential ID is required'
      });
    }

    const workerId = getWorkerId();

    // Check if credential exists in issuance database
    const issuedCredential = checkCredentialInIssuanceDB(id);

    if (issuedCredential) {
      // Credential is valid
      logVerification(id, true, workerId);

      return res.status(200).json({
        success: true,
        valid: true,
        message: 'Credential is valid',
        credentialId: id,
        workerId: workerId,
        issuedBy: issuedCredential.worker_id,
        issuedAt: issuedCredential.issued_at,
        verifiedAt: new Date().toISOString(),
        credentialData: JSON.parse(issuedCredential.credential_data)
      });
    } else {
      // Credential not found
      logVerification(id, false, workerId);

      return res.status(404).json({
        success: true,
        valid: false,
        message: 'Credential not found or invalid',
        credentialId: id,
        workerId: workerId,
        verifiedAt: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Error verifying credential:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/verifications - Get all verification logs (for debugging)
router.get('/verifications', (req: Request, res: Response) => {
  try {
    const verifications = getAllVerifications();
    
    return res.json({
      success: true,
      count: verifications.length,
      verifications: verifications
    });
  } catch (error) {
    console.error('Error fetching verifications:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/verifications/:credentialId - Get verification history for a credential
router.get('/verifications/:credentialId', (req: Request, res: Response) => {
  try {
    const { credentialId } = req.params;
    const history = getVerificationHistory(credentialId);
    
    return res.json({
      success: true,
      credentialId: credentialId,
      count: history.length,
      history: history
    });
  } catch (error) {
    console.error('Error fetching verification history:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
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

export default router;