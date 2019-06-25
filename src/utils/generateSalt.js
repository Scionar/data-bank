const MD5 = require('crypto-js/md5');

/**
 * Generate unique timestamp per run.
 *
 * @param {string} username - Username of account
 * @return {string} unique hash
 */
const generateSalt = username => {
  const timeStamp = Math.floor(new Date() / 1000);
  return MD5(username + timeStamp);
};

module.exports = generateSalt;
