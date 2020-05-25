const { check } = require('express-validator')

module.exports = [
    check('id_cliente', 'É necessário selecionar um cliente!').notEmpty(),
    check('id_cidade', 'É necessário selecionar uma cidade!').notEmpty(),
    check('rua', 'Campo "rua" é obrigatório!').notEmpty(),
    check('numero', 'Campo "número" é obrigatório! (Marcar S/N caso não tenha!)').notEmpty(),
    check('bairro', 'Campo "bairro" é obrigatório!').notEmpty(),
]