const { check } = require('express-validator')
const existingRegistry = require('../databaseValidations/existingRegistryValidation')

module.exports = [
    check('marca', 'A marca não pode estar vazia!').notEmpty(),
    check('marca', 'Já existe um registro com a Marca informada!').custom(async (value, { req }) => {
         if(await existingRegistry('marcas', 'marca', value, req.params.id))
            return Promise.reject()
    })
]