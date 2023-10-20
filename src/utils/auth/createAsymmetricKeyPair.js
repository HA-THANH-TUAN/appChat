const { generateKeyPairSync } = require('node:crypto');

const createPriPubKey = () => {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
};
module.exports = createPriPubKey;
