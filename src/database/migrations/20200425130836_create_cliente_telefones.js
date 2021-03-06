
exports.up = function (knex) {
    return knex.schema.createTable('cliente_telefones', function (t) {
        t.increments()
        t.integer('id_cliente').notNullable()
        t.string('numero', 11).notNullable()
        t.string('tipo', 3).notNullable() //CEL, TEL
        t.foreign('id_cliente').references('id').inTable('clientes').onDelete('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('cliente_telefones')
};
