const connection = require('../../database/connection')

module.exports = async (cpf, id = -1) => {
    let count = 0

    if (cpf) {
        count = (await connection('clientes')
            .count()
            .where({ cpf })
            .andWhereNot({ id })
        )[0].count
    }

    return !(count > 0)
}