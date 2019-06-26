const fastify = require('fastify')({
  logger: true
});
const mongoose = require('mongoose');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databaseName = process.env.DATABASE_NAME || 'databank';

mongoose
  .connect(`mongodb://${databaseHost}/${databaseName}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = fastify;
