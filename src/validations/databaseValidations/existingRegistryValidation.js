const connection = require('../../database/connection')

module.exports = async (table, field, data, id = -1) => {
    const [{ count }] = await connection(table)
        .where(field, data)
        .andWhereNot({ id })
        .count()
        
    return count >= 1
}