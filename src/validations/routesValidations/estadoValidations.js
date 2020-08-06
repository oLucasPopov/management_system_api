const { check } = require('express-validator')

module.exports = [
    check('estado', 'O nome do estado é obrigatório!').notEmpty(),
]