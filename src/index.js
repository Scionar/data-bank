const fastify = require('./server.js');
const routes = require('./routes');
const swagger = require('./config/swagger');

fastify.register(require('fastify-swagger'), swagger.options);

routes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    const serverPort = process.env.SERVER_PORT || 3000;
    const serverHost = process.env.SERVER_HOST || '0.0.0.0';

    await fastify.listen(serverPort, serverHost);
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
