const { check } = require('express-validator')
const existingRegistry = require('./../databaseValidations/existingRegistryValidation')

module.exports = [
    check('unidade', 'A descrição da unidade não pode estar vazia!').notEmpty(),
    check('unidade', 'Esta unidade já está cadastrada!').custom(async (value, { req }) => {
        if (await existingRegistry('unidades_medida', 'unidade', value, req.params.id))
            return Promise.reject()
    }),
    check('und_equivalente', 'É necessário escolher uma unidade equivalente!').notEmpty(),
    check('qtd_equivalente', 'É necessário escolher uma quantidade equivalente!').notEmpty(),
    check('qtd_equivalente', 'A quantidade equivalente não pode ser zero!').custom((value) => {
        return value ?? Promise.reject();
    })
]