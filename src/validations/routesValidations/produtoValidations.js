const { check } = require('express-validator')
const existingRegistryValidation = require('../databaseValidations/existingRegistryValidation')

module.exports = [
    check('id_unidade', 'Selecione a unidade a ser utilizada pelo produto!').notEmpty(),
    check('descricao', 'O Produto deve ter uma descrição!').notEmpty(),
    check('tipo', 'Selecione o tipo do produto!').notEmpty(),
    check('codigo_barras', 'Já existe um produto com esse código de barras!').custom(async (value, { req }) => {
        if (await existingRegistryValidation('produtos', 'codigo_barras', value, req.params.id))
            return Promise.reject()
    }).bail(),
    check('descricao', 'Já existe um produto com essa descrição!').custom(async (value, { req }) => {
        if (await existingRegistryValidation('produtos', 'descricao', value, req.params.id))
            return Promise.reject()
    }),
]