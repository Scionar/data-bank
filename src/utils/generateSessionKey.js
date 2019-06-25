const MD5 = require('crypto-js/md5');

/**
 * Generate session hash key.
 *
 * Notice that this is not full string returned to user. Full string includes
 * also user id.
 *
 * @return {string} unique hash
 */
const generateSessionKey = () => {
  const timeStamp = Math.floor(new Date() / 1000);
  return MD5(timeStamp);
};

module.exports = generateSessionKey;
