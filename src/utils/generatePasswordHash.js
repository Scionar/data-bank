const SHA512 = require('crypto-js/sha512');

/**
 * Generate password hash for database.
 *
 * @param {string} password - Raw password of user.
 * @param {string} salt - Salt generated for account
 * @return {string} Hashed password
 */
const generatePasswordHash = (password, salt) => {
  return SHA512(password + salt);
};

module.exports = generatePasswordHash;
