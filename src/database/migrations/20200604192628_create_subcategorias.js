
exports.up = function (knex) {
    return knex.schema.createTable('subcategorias', (t) => {
        t.increments()
        t.integer('id_categoria').notNullable()
        t.text('subcategoria')

        t.foreign('id_categoria').references('id').inTable('categorias')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('subcategorias')
};
