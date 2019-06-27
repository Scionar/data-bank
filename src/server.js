const fastify = require('fastify')({
  logger: true
});
const mongoose = require('mongoose');

const connectString = process.env.DATABASE_CONNECTION_STRING;
if (!connectString) {
  throw new Error('No database string defined');
}

mongoose
  .connect(connectString, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = fastify;
