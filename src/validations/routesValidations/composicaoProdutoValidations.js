const connection = require('../../database/connection')
const { check } = require('express-validator')
const existingRegistryValidation = require('../databaseValidations/existingRegistryValidation')

module.exports = [
    check('pro_codigo', 'O código do produto principal é obrigatório!').notEmpty(),
    check('pro_composicao', 'O código do produto composição é obrigatório!').notEmpty(),
    check('quantidade', 'É necessário definir uma quantidade!').notEmpty(),
    check('quantidade', 'A quantidade não pode ser menor ou igual a zero!').custom((value) => (value > 0)),
    check('pro_composicao', 'Esta composição já foi inserida nesse produto!').custom(async (value, { req }) => {
        const { pro_codigo } = req.body
        const [{ count }] = await connection('composicao_produtos')
            .where('pro_codigo', pro_codigo)
            .andWhere('pro_composicao', value)
            .count()

        return count >= 1 ? Promise.reject() : Promise.resolve()
    })
]