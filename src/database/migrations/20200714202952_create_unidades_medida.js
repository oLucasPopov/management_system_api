
exports.up = function (knex) {
    return knex.schema.createTable('unidades_medida', (t) => {
        t.increments()
        t.string('unidade', 5).notNullable()
        t.integer('und_equivalente', 1)
            .notNullable()
            .comment('0 = Kg | 1 = Und.')
        t.decimal('qtd_equivalente', 18, 4)
            .notNullable()
            .comment('Quantidade em unidade ou KG equivalente àquela unidade de medida.')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('unidades_medida');
};
