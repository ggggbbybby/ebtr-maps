const knex = require('./lib/db');

const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-static'), {
  root: `${__dirname}/public`
});

fastify.get('/routes', async (request, reply) => {
  const routes = await knex('route_direction')
    .select('route_id', knex.raw('group_concat(direction) as directions'))
    .groupBy('route_id')
    .orderBy('route_id');
  for (const route of routes) {
    route.directions = route.directions.split(/,/);
  }
  reply.send(routes);
});

fastify.get('/stops/:line/:dir', async (request, reply) => {
  const ids = await knex('route_direction')
    .select('id')
    .where({ route_id: request.params.line, direction: request.params.dir })
    .orderBy('id')
    .limit(1);
  if (!ids.length) {
    throw new Error("not found");
  }
  const id = ids[0].id;
  reply.send(await knex('route_stop').select('lat','lng').where({ route_direction_id: id }).orderBy('seq'));
});

fastify.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    throw err;
  }
});
