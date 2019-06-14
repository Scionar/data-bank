const boom = require('boom');

const Account = require('../models/Account');

// Get all accounts
exports.getAccounts = async (req, reply) => {
  try {
    const accounts = await Account.find();
    return accounts;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single account by ID
exports.getSingleAccount = async (req, reply) => {
  try {
    const id = req.params.id;
    const account = await Account.findById(id);
    return account;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new account
exports.addAccount = async (req, reply) => {
  try {
    const account = new Account(req.body);
    return account.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing account
exports.updateAccount = async (req, reply) => {
  try {
    const id = req.params.id;
    const account = req.body;
    const { ...updateData } = account;
    const update = await Account.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a account
exports.deleteAccount = async (req, reply) => {
  try {
    const id = req.params.id;
    const account = await Account.findByIdAndRemove(id);
    return account;
  } catch (err) {
    throw boom.boomify(err);
  }
};
