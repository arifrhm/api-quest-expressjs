import { randomBytes } from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY || 'api-quest-secret-key';
const VALID_TOKEN = generateToken();

function generateToken() {
  return randomBytes(32).toString('hex');
}

export function validateCredentials(username, password) {
  return username === 'admin' && password === 'password';
}

export function generateAccessToken() {
  return Buffer.from(`${VALID_TOKEN}.${Date.now()}`).toString('base64');
}

export function validateToken(token) {
  if (!token) return false;
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  return decoded.startsWith(VALID_TOKEN);
}
