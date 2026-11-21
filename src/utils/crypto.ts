/**
 * Cryptographic security utilities for user profile PIN/password protection.
 * Implements high-iteration PBKDF2-SHA256 (600,000 iterations) with Web Crypto API,
 * providing brute-force resistance while supporting seamless migration from legacy hashes.
 */

const STATIC_SALT = 'TT_SALT_FOSS_2026_';
const PBKDF2_ITERATIONS = 600000;

// Legacy fast SHA-256 (for checking and migrating old profiles)
async function legacySha256(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode('TypingTrainer_FOSS_2026_SecSalt_' + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Modern PBKDF2-SHA256 with 600,000 iterations
export async function hashPin(pin: string, salt: string = STATIC_SALT): Promise<string> {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const saltBuffer = encoder.encode(salt);
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  return 'pbkdf2$' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPin(
  pin: string,
  storedHash: string
): Promise<{ valid: boolean; shouldMigrate?: boolean; newHash?: string }> {
  if (!storedHash) return { valid: true };

  // Check if it's already a PBKDF2 hash
  if (storedHash.startsWith('pbkdf2$')) {
    const computed = await hashPin(pin);
    return { valid: computed === storedHash };
  }

  // Check legacy SHA-256 hash
  const legacyComputed = await legacySha256(pin);
  if (legacyComputed === storedHash) {
    // Migration: user successfully unlocked with legacy hash, upgrade to PBKDF2
    const upgraded = await hashPin(pin);
    return { valid: true, shouldMigrate: true, newHash: upgraded };
  }

  return { valid: false };
}
