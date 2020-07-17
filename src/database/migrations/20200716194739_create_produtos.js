
exports.up = function (knex) {
    return knex.schema.createTable('produtos', (t) => {
        t.increments()
        t.timestamp('data_cadastro').notNullable().defaultTo(knex.fn.now())
        t.integer('id_unidade').notNullable()
        t.integer('id_marca')
        t.integer('id_categoria')
        t.integer('id_subcategoria')
        t.integer('tipo', 1).comment(
            `0: Produto Industrializado 
           | 1: Produto Acabado 
           | 2: SubProduto 
           | 3: Embalagem 
           |99: outros`
        )
        t.text('descricao').notNullable()
        t.text('localizacao')
        t.text('codigo_barras', 13)
        t.decimal('estoque', 18, 4)
        t.decimal('estoque_minimo', 18, 4)

        t.foreign('id_unidade').references('id').inTable('unidades_medida')
        t.foreign('id_marca').references('id').inTable('marcas')
        t.foreign('id_categoria').references('id').inTable('categorias')
        t.foreign('id_subcategoria').references('id').inTable('subcategorias')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('produtos')
};
