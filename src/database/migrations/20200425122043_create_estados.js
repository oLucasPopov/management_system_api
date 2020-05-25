
exports.up = function (knex) {
    return knex.schema.createTable('estados', function (t) {
        t.increments()
        t.string('estado').notNullable()
        t.unique('estado')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('estados')
};
