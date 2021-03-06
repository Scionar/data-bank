const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Date = mongoose.Schema.Types.Date;

const sessionSchema = new mongoose.Schema({
  account_id: ObjectId,
  key: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
