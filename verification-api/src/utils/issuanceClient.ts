import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs';

const getIssuanceDbPath = (): string => {
  // In Docker, issuance DB is mounted at /app/issuance-data
  const dockerPath = '/app/issuance-data/credentials.db';
  
  // In local development, use relative path
  const localPath = path.join(__dirname, '../../../issuance-api/data/credentials.db');
  
  if (fs.existsSync(dockerPath)) {
    console.log('📊 Using Docker issuance database path');
    return dockerPath;
  }
  
  console.log('📊 Using local issuance database path');
  return localPath;
};

// Path to issuance API database
const issuanceDbPath = getIssuanceDbPath();

export interface IssuedCredential {
  id: string;
  credential_data: string;
  worker_id: string;
  issued_at: string;
}

export const checkCredentialInIssuanceDB = (credentialId: string): IssuedCredential | null => {
  try {
    const db = new Database(issuanceDbPath, { readonly: true });
    const stmt = db.prepare('SELECT * FROM credentials WHERE id = ?');
    const result = stmt.get(credentialId) as IssuedCredential | undefined;
    db.close();
    
    return result || null;
  } catch (error) {
    console.error('Error connecting to issuance database:', error);
    return null;
  }
};