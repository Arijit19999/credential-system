import React, { useState } from 'react';
import { verifyCredential } from '../services/api';
import type { VerificationResponse } from '../types';
import Alert from '../components/Alert';
import './VerificationPage.css';

const VerificationPage: React.FC = () => {
  const [credentialId, setCredentialId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<VerificationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const result = await verifyCredential(credentialId);
      setResponse(result);
    } catch (error: any) {
      setResponse({
        success: false,
        valid: false,
        message: error.message || 'Failed to verify credential',
        credentialId: credentialId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="page-title">Verify Credential</h2>
        <p className="page-description">
          Enter a credential ID to verify its authenticity
        </p>

        {response && (
          <Alert
            type={response.valid ? 'success' : 'error'}
            message={response.message}
            onClose={() => setResponse(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="credentialId">Credential ID *</label>
            <input
              type="text"
              id="credentialId"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="e.g., CRED001"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Credential'}
          </button>
        </form>

        {response && response.valid && response.credentialData && (
          <div className="verification-result">
            <h3>✅ Credential Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Credential ID:</span>
                <span className="detail-value">{response.credentialData.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{response.credentialData.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{response.credentialData.email}</span>
              </div>
              {response.credentialData.course && (
                <div className="detail-item">
                  <span className="detail-label">Course:</span>
                  <span className="detail-value">{response.credentialData.course}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Issued By:</span>
                <span className="detail-value">{response.issuedBy}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Issued At:</span>
                <span className="detail-value">
                  {new Date(response.issuedAt!).toLocaleString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Verified By:</span>
                <span className="detail-value">{response.workerId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Verified At:</span>
                <span className="detail-value">
                  {new Date(response.verifiedAt!).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;