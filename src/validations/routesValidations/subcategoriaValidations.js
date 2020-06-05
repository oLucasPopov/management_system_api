const { check } = require('express-validator')
const { existingSubcategoriaValidation } = require('./../databaseValidations')

module.exports = [
    check('id_categoria', 'É necessário informar qual Categoria esta Subcategoria pertence!').notEmpty(),
    check('subcategoria', 'A Descrição da Subcategoria é obrigatória!').notEmpty(),
    check('subcategoria', 'Subcategoria já cadastrada!')
        .custom(async (value, { req }) => {
            if (await existingSubcategoriaValidation(value, req.params.id, req.body.id_categoria) >= 1)
                return Promise.reject()
        })
]