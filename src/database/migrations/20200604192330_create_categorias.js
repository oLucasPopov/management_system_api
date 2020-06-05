
exports.up = function (knex) {
    return knex.schema.createTable('categorias', (t) => {
        t.increments()
        t.string('categoria').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('categorias')
};
