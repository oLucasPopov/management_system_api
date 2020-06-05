const connection = require('../../database/connection')

module.exports = async (data, id = -1, id_categoria = -1) => {
    const [{ count }] = await connection('subcategorias')
        .where('subcategoria', data)
        .andWhere('id_categoria', id_categoria)
        .andWhereNot({ id })
        .count()
        
    return count
}