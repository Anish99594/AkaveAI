const crypto = require('crypto');

const encryptFile = (buffer) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encrypted, key: key.toString('hex'), iv: iv.toString('hex') };
};

const decryptFile = (encryptedBuffer, keyHex, ivHex) => {
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
};

module.exports = { encryptFile, decryptFile };