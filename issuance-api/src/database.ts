import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'credentials.db');
console.log(`📊 Database path: ${dbPath}`);

const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS credentials (
    id TEXT PRIMARY KEY,
    credential_data TEXT NOT NULL,
    worker_id TEXT NOT NULL,
    issued_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Database initialized successfully');

export interface Credential {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export interface CredentialRecord {
  id: string;
  credential_data: string;
  worker_id: string;
  issued_at: string;
}

export const credentialExists = (credentialId: string): boolean => {
  const stmt = db.prepare('SELECT id FROM credentials WHERE id = ?');
  const result = stmt.get(credentialId);
  return result !== undefined;
};

export const saveCredential = (credential: Credential, workerId: string): void => {
  const stmt = db.prepare(
    'INSERT INTO credentials (id, credential_data, worker_id) VALUES (?, ?, ?)'
  );
  stmt.run(credential.id, JSON.stringify(credential), workerId);
};

export const getCredential = (credentialId: string): CredentialRecord | undefined => {
  const stmt = db.prepare('SELECT * FROM credentials WHERE id = ?');
  return stmt.get(credentialId) as CredentialRecord | undefined;
};

export const getAllCredentials = (): CredentialRecord[] => {
  const stmt = db.prepare('SELECT * FROM credentials ORDER BY issued_at DESC');
  return stmt.all() as CredentialRecord[];
};

export default db;