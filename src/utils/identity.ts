import crypto from "crypto";

/**
 * Generate a unique session ID based on browser fingerprint and timestamp
 */
export function generateSessionId(browserInfo: string, ipHash: string): string {
  const timestamp = Date.now().toString();
  const hash = crypto
    .createHash("sha256")
    .update(browserInfo + timestamp + ipHash)
    .digest("hex")
    .slice(0, 16);

  return hash;
}

/**
 * Create a placeholder torrent info hash
 */
export function createTorrentInfoHash(
  sessionId: string,
  fileName: string,
): string {
  return crypto
    .createHash("sha1")
    .update(`${sessionId}:${fileName}:${Date.now()}`)
    .digest("hex");
}

/**
 * Generate a nonce for encryption
 */
export function generateNonce(): Uint8Array {
  return crypto.randomBytes(24);
}

// File: src/utils/encryption.ts
import sodium from "libsodium-wrappers";
import { EncryptionKeys } from "./types";

/**
 * Encrypt data using libsodium
 */
export async function encryptData(
  data: Buffer | string,
  recipientPublicKey: string,
  senderPrivateKey: string,
): Promise<{ encrypted: Buffer; nonce: Buffer }> {
  await sodium.ready;

  const dataBuffer = typeof data === "string" ? Buffer.from(data) : data;
  const nonce = Buffer.from(
    sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES),
  );
  const publicKeyBuffer = Buffer.from(recipientPublicKey, "hex");
  const privateKeyBuffer = Buffer.from(senderPrivateKey, "hex");

  const encrypted = Buffer.from(
    sodium.crypto_box(dataBuffer, nonce, publicKeyBuffer, privateKeyBuffer),
  );

  return { encrypted, nonce };
}

/**
 * Decrypt data using libsodium
 */
export async function decryptData(
  encryptedData: Buffer,
  nonce: Buffer,
  senderPublicKey: string,
  recipientPrivateKey: string,
): Promise<Buffer> {
  await sodium.ready;

  const publicKeyBuffer = Buffer.from(senderPublicKey, "hex");
  const privateKeyBuffer = Buffer.from(recipientPrivateKey, "hex");

  const decrypted = Buffer.from(
    sodium.crypto_box_open(
      encryptedData,
      nonce,
      publicKeyBuffer,
      privateKeyBuffer,
    ),
  );

  return decrypted;
}
