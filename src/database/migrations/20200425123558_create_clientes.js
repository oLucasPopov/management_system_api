
exports.up = function (knex) {
    return knex.schema.createTable('clientes', function (t) {
        t.increments()
        t.string('tipo_pessoa', 2).notNullable() //PF, PJ
        t.string('nome').notNullable()
        t.date('data_nascimento')
        t.string('sexo', 1) //M, F
        t.string('rg', 9)
        t.string('cpf', 11)
        t.string('cnpj', 14)
        t.string('email')
        t.boolean('bloqueado').notNullable().defaultTo(false)

        
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('clientes')
};
