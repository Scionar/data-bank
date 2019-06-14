const fastify = require('fastify')({
  logger: true
});
const mongoose = require('mongoose');

const routes = require('./routes');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databaseName = process.env.DATABASE_NAME || 'databank';

mongoose
  .connect(`mongodb://${databaseHost}/${databaseName}`)
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

routes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen(port);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
