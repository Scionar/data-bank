const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  salt: String
});

module.exports = mongoose.model('Account', accountSchema);
