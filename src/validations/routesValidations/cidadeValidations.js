const { check } = require('express-validator')

module.exports = [
    check('cidade', 'O nome da cidade é obrigatório!').notEmpty(),
    check('id_estado', 'O campo "estado" é obrigatório!').notEmpty()
]