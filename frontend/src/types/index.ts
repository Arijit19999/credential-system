export interface Credential {
  id: string;
  name: string;
  email: string;
  course?: string;
  issueDate?: string;
  [key: string]: any;
}

export interface IssuanceResponse {
  success: boolean;
  message: string;
  workerId?: string;
  credentialId?: string;
  timestamp?: string;
}

export interface VerificationResponse {
  success: boolean;
  valid: boolean;
  message: string;
  credentialId: string;
  workerId?: string;
  issuedBy?: string;
  issuedAt?: string;
  verifiedAt?: string;
  credentialData?: Credential;
}