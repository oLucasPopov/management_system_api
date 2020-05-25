const { check } = require('express-validator')
const { validateCPF, validateCNPJ } = require('../documentsValidations')
const { existingCPFValidation, existingCNPJvalidation } = require('../databaseValidations')

module.exports = [
    check('tipo_pessoa', 'Informe se é uma pessoa física ou jurídica!').notEmpty(),
    check('nome', 'O nome é obrigatório!').notEmpty(),
    check('email', 'O email digitado não é valido!')
        .if((value) => value.length > 0)
        .isEmail(),
    check('cpf', 'A numeração do CPF está incorreta!')
        .if((value) => value.length > 0)
        .custom((value) => {
            return validateCPF(value)
        }),
    check('cpf', 'Já existe um cliente com esse CPF!')
        .if((value) => value.length > 0)
        .custom(async (value, { req }) => {
            if (!(await existingCPFValidation(value, req.params.id)))
                return Promise.reject()
        }),
    check('cnpj', 'A numeração do CNPJ está incorreta!')
        .if((value) => value.length > 0)
        .custom((value) => {
            return validateCNPJ(value)
        }),
    check('cnpj', 'Já existe um cliente com esse CNPJ!')
        .if((value) => value.length > 0)
        .custom(async (value, { req }) => {
            if (!(await existingCNPJvalidation(value, req.params.id)))
                return Promise.reject()
        }),
]

