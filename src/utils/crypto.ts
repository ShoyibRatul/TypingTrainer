/**
 * Profile security utilities for PIN/password hashing and validation
 * Uses standard Web Crypto API (SHA-256 with project salt).
 */

const SALT = 'TypingTrainer_FOSS_2026_SecSalt_';

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(SALT + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPin(pin: string, storedHash: string): Promise<boolean> {
  if (!storedHash) return true;
  const computed = await hashPin(pin);
  return computed === storedHash;
}
