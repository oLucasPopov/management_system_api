const connection = require('../../database/connection')

module.exports = async (cnpj, id = -1) => {
    let count = 0

    if (cnpj) {
        count = (await connection('clientes')
            .count()
            .where({ cnpj })
            .andWhereNot({ id })
        )[0].count
    }

    return !(count > 0)
}