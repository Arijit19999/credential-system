import React, { useState } from 'react';
import { issueCredential } from '../services/api';
import type { Credential, IssuanceResponse } from '../types';
import Alert from '../components/Alert';
import './IssuancePage.css';

const IssuancePage: React.FC = () => {
  const [formData, setFormData] = useState<Credential>({
    id: '',
    name: '',
    email: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IssuanceResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const result = await issueCredential(formData);
      setResponse(result);

      if (result.success) {
        // Clear form on success
        setFormData({
          id: '',
          name: '',
          email: '',
          course: '',
        });
      }
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.message || 'Failed to issue credential',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateId = () => {
    const id = `CRED${Date.now()}`;
    setFormData({ ...formData, id });
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="page-title">Issue New Credential</h2>
        <p className="page-description">
          Fill out the form below to issue a new credential
        </p>

        {response && (
          <Alert
            type={response.success ? 'success' : 'error'}
            message={response.message}
            onClose={() => setResponse(null)}
          />
        )}

        {response && response.success && response.workerId && (
          <div className="info-box">
            <p><strong>Worker ID:</strong> {response.workerId}</p>
            <p><strong>Credential ID:</strong> {response.credentialId}</p>
            <p><strong>Timestamp:</strong> {new Date(response.timestamp!).toLocaleString()}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="id">Credential ID *</label>
            <div className="input-group">
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g., CRED001"
                required
              />
              <button type="button" onClick={generateId} className="btn-secondary">
                Generate ID
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course/Program</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Issuing...' : 'Issue Credential'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssuancePage;