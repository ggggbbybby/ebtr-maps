
exports.up = function(knex) {
  return knex.schema
  .createTable('route', table => {
    table.string('id').primary();
    table.string('description').notNullable();
    table.string('type').notNullable();
    table.index(['type']);
  })
  .createTable('route_direction', table => {
    table.increments('id').notNullable().primary();
    table.string('route_id').notNullable().references('id').inTable('route');
    table.string('direction').notNullable();
    table.string('first_place').notNullable();
    table.string('last_place').notNullable();
    table.string('destination').notNullable();
    table.string('note');
  })
  .createTable('route_stop', table => {
    table.integer('route_direction_id').notNullable().references('id').inTable('ro');
    table.integer('seq').notNullable();
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.float('heading').notNullable();
    table.primary(['route_direction_id', 'seq']);
  });
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('route')
  .dropTable('route_direction')
  .dropTable('route_stop');
};
