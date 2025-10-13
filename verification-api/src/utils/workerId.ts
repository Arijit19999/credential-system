import os from 'os';

// Get worker ID from environment variable or generate one
export const getWorkerId = (): string => {
  return process.env.WORKER_ID || `verifier-${os.hostname()}-1`;
};