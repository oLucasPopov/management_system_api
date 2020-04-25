
exports.up = function (knex) {
    return knex.schema.createTable('cliente_enderecos', function (t) {
        t.increments()
        t.integer('id_cliente').notNullable()
        t.integer('id_cidade').notNullable()
        t.string('rua').notNullable()
        t.string('numero', 32).notNullable()
        t.string('bairro').notNullable()
        t.string('complemento', 32)

        t.foreign('id_cliente').references('id').inTable('clientes')
        t.foreign('id_cidade').references('id').inTable('cidades')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('cliente_enderecos')
};
