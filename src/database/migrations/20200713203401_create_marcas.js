
exports.up = function (knex) {
  return knex.schema.createTable('marcas', (t) => {
    t.increments()
    t.text('marca').notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('marcas');
};
