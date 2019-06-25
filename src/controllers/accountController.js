const boom = require('boom');

const generateSalt = require('../utils/generateSalt');
const generatePasswordHash = require('../utils/generatePasswordHash');
const Account = require('../models/Account');

// Get all accounts
exports.getAccounts = async () => {
  try {
    const accounts = await Account.find();
    return accounts;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single account by ID
exports.getSingleAccount = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const account = await Account.findById(id);
    return account;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new account
exports.addAccount = async req => {
  try {
    const salt = generateSalt(req.username);
    const passwordHash = generatePasswordHash(req.password, salt);

    const account = new Account({
      ...req,
      salt: salt,
      password: passwordHash
    });
    return account.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add multiple accounts
exports.addMultipleAccounts = async accountArray => {
  try {
    // Modify data before setting it
    const data = accountArray.map(item => {
      const salt = generateSalt(item.username);
      const passwordHash = generateSalt(item.password, salt);

      return {
        ...item,
        salt: salt,
        password: passwordHash
      };
    });

    return await Account.insertMany(data);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing account
exports.updateAccount = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;

    const salt = generateSalt(updateData.username);
    const passwordHash = generateSalt(updateData.password, salt);

    const update = await Account.findByIdAndUpdate(
      id,
      { ...updateData, salt: salt, password: passwordHash },
      { new: true }
    );
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete an account
exports.deleteAccount = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const account = await Account.findByIdAndRemove(id);
    return account;
  } catch (err) {
    throw boom.boomify(err);
  }
};
