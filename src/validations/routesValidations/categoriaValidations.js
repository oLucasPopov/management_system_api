const { check } = require('express-validator')
const { existingRegistryValidation } = require('./../databaseValidations')

module.exports = [
    check('categoria', 'A Descrição da Categoria é obrigatória!').notEmpty(),
    check('categoria', 'Categoria já cadastrada!')
        .custom(async (value, { req }) => {
            if (await existingRegistryValidation('categorias', 'categoria', req.body.categoria, req.params.id) >= 1)
                return Promise.reject()
        })
]