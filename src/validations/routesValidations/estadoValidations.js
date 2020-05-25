const { check } = require('express-validator')

module.exports = [
    check('cidade', 'O nome do estado é obrigatório!').notEmpty(),
]