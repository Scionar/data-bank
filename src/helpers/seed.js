const faker = require('faker');
const boom = require('boom');

const fastify = require('../server.js');
const Account = require('../models/Account');

const generateAccountData = () => {
  return new Array(50).fill().map(() => {
    const username = faker.fake('{{internet.userName}}');
    const firstName = faker.fake('{{name.firstName}}');
    const lastName = faker.fake('{{name.lastName}}');
    const email = faker.fake(
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`
    );
    const password = faker.fake('{{helpers.randomize}}');
    const salt = faker.fake('{{helpers.randomize}}');

    return {
      username,
      email,
      password,
      salt
    };
  });

  return ownerData;
};

fastify.ready().then(
  async () => {
    try {
      const accounts = await Account.insertMany(generateAccountData());

      console.log(`
      Data successfully added:
        - ${accounts.length} owners added.
      `);
    } catch (err) {
      throw boom.boomify(err);
    }
    process.exit();
  },
  err => {
    console.log('An error occured: ', err);
    process.exit();
  }
);
