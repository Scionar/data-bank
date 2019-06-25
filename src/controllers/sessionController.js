const boom = require('boom');

const generateSessionKey = require('../utils/generateSessionKey');
const Account = require('../models/Account');
const Session = require('../models/Session');

// Add a new session
exports.addSession = async req => {
  try {
    const account = await Account.find({ username: req.username });
    const session = new Session({
      ...req,
      account_id: account.id,
      key: generateSessionKey(),
      timeStamp: new Date()
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
exports.findSession = async req => {
  try {
    const authKey = req.params === undefined ? req.authkey : req.params.authkey;
    const [accountId, key] = authKey.split(':');

    const sessions = await Session.find({ account_id: accountId, key: key });
    return sessions;
  } catch (err) {
    throw boom.boomify(err);
  }
};
