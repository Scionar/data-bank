const boom = require('boom');

const generateSessionKey = require('../utils/generateSessionKey');
const Account = require('../models/Account');
const Session = require('../models/Session');

// Get all sessions
exports.getSessions = async () => {
  try {
    const sessions = await Session.find();
    return sessions;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single session by ID
exports.getSingleSession = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const session = await Session.findById(id);
    return session;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new session
exports.addSession = async req => {
  try {
    const username = req.body === undefined ? req.username : req.body.username;
    const account = await Account.find({ username });

    if (!account.length) throw new Error('No account found with username');

    const session = new Session({
      account_id: account[0]._id,
      key: generateSessionKey(),
      timestamp: new Date()
    });
    return session.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a session by ID
exports.deleteSession = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const session = await Session.findByIdAndRemove(id);
    return session;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a session by authKey string
exports.findSessionByAuthkey = async req => {
  try {
    const authKey = req.params === undefined ? req.authkey : req.params.authkey;
    const [accountId, key] = authKey.split(':');

    const sessions = await Session.find({ account_id: accountId, key: key });
    return sessions;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a session by authKey string
exports.findSessionsByAccountId = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;

    const sessions = await Session.find({ account_id: id });
    return sessions;
  } catch (err) {
    throw boom.boomify(err);
  }
};
