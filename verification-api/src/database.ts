import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'verifications.db');
console.log(`📊 Database path: ${dbPath}`);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create verifications log table
db.exec(`
  CREATE TABLE IF NOT EXISTS verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    credential_id TEXT NOT NULL,
    verified BOOLEAN NOT NULL,
    worker_id TEXT NOT NULL,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ Verification database initialized');

export interface VerificationLog {
  id: number;
  credential_id: string;
  verified: boolean;
  worker_id: string;
  verified_at: string;
}

export const logVerification = (
  credentialId: string, 
  verified: boolean, 
  workerId: string
): void => {
  const stmt = db.prepare(
    'INSERT INTO verifications (credential_id, verified, worker_id) VALUES (?, ?, ?)'
  );
  stmt.run(credentialId, verified ? 1 : 0, workerId);
};

export const getVerificationHistory = (credentialId: string): VerificationLog[] => {
  const stmt = db.prepare(
    'SELECT * FROM verifications WHERE credential_id = ? ORDER BY verified_at DESC'
  );
  return stmt.all(credentialId) as VerificationLog[];
};

export const getAllVerifications = (): VerificationLog[] => {
  const stmt = db.prepare('SELECT * FROM verifications ORDER BY verified_at DESC LIMIT 100');
  return stmt.all() as VerificationLog[];
};

export default db;