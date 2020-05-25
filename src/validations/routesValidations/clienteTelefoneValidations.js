const { check } = require('express-validator')

module.exports = [
    check('numero', 'O número não pode estar em branco!').notEmpty(),
    check('numero', 'O número deve ter 10 ou 11 dígitos!').isLength({ min: 10, max: 11 }),
    check('tipo', 'Selecione se é um celular ou um telefone!').notEmpty(),
    check('tipo', 'Tipo inválido!').if((value) => value.length > 0).isIn(["CEL", "TEL"])
]