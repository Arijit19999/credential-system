import axios from 'axios';
import type { Credential, IssuanceResponse, VerificationResponse } from '../types/index';

// Vite uses import.meta.env instead of process.env
const ISSUANCE_API_URL = import.meta.env.VITE_ISSUANCE_API_URL || 'http://localhost:3001/api';
const VERIFICATION_API_URL = import.meta.env.VITE_VERIFICATION_API_URL || 'http://localhost:3002/api';

// Issuance API
export const issueCredential = async (credential: Credential): Promise<IssuanceResponse> => {
  try {
    const response = await axios.post(`${ISSUANCE_API_URL}/issue`, credential);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error('Failed to connect to Issuance API');
  }
};

export const getAllCredentials = async (): Promise<any> => {
  try {
    const response = await axios.get(`${ISSUANCE_API_URL}/credentials`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch credentials');
  }
};

// Verification API
export const verifyCredential = async (credentialId: string): Promise<VerificationResponse> => {
  try {
    const response = await axios.post(`${VERIFICATION_API_URL}/verify`, { id: credentialId });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error('Failed to connect to Verification API');
  }
};

export const getVerificationHistory = async (credentialId?: string): Promise<any> => {
  try {
    const url = credentialId 
      ? `${VERIFICATION_API_URL}/verifications/${credentialId}`
      : `${VERIFICATION_API_URL}/verifications`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch verification history');
  }
};