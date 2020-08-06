
exports.up = function (knex) {
    return knex.schema.createTable('composicao_produtos', (t) => {
        t.increments()
        t.integer('pro_codigo').notNullable()      //produto "final"
        t.integer('pro_composicao').notNullable()  //produto que irá compor o produto final
        t.decimal('quantidade', 18, 4).notNullable()

        t.foreign('pro_codigo').references('id').inTable('produtos')
        t.foreign('pro_composicao').references('id').inTable('produtos')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('composicao_produtos');
};
