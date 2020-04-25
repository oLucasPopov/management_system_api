
exports.up = function (knex) {
    return knex.schema.createTable('cidades', function (t) {
        t.increments()
        t.string('cidade').notNullable()
        t.integer('id_estado').notNullable()
        t.foreign('id_estado').references('id').inTable('estados')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('cidades')
};
