const connection = require('../database/connection')

module.exports = {
    async search(req, res) {
        const { id } = req.params
        const cidades = await connection('cidades')
            .innerJoin('estados', 'estados.id', '=', 'cidades.id_estado')
            .where('cidades.id', id)
            .select(['cidades.id', 'cidades.cidade', 'cidades.id_estado', 'estados.estado'])

        return res.json(cidades)
    },

    async list(req, res) {
        const { page = 1 } = req.params
        const [count] = await connection('cidades').count()
        const cidades = await connection('cidades')
            .limit(10)
            .offset((page - 1) * 5)
            .join('estados', 'estados.id', '=', 'cidades.id_estado')
            .select(['cidades.id', 'cidades.cidade', 'cidades.id_estado', 'estados.estado'])
            .orderBy('estados.estado')

        res.header('X-Total-Count', count['count'])
        return res.json(cidades)
    },

    async create(req, res) {
        try {
            const { id_estado, cidade } = req.body

            const [estados = count] = await connection('cidades').where({ id_estado, cidade }).count()
            if (estados.count > 0) throw { code: '23505' }

            await connection('cidades').insert({ id_estado, cidade })
            return res.sendStatus(200)
        } catch (e) {
            switch (e.code) {
                case '23505':
                    return res.status(409).json({ error: 'A cidade que você está tentando cadastrar já existe!' })
                case '23503':
                    return res.status(404).json({ error: 'O estado informado não existe!' })
                default:
                    console.log(e)
            }
        }
    },

    async update(req, res) {
        try {
            const { id, id_estado, cidade } = req.body

            const [estados = count] = await connection('cidades')
                .whereNot({id})
                .andWhere({id_estado, cidade})
                .count()
                
            if (estados.count > 0) throw { code: '23505' }

            await connection('cidades')
                .where('id', id)
                .update({ id_estado, cidade })
            return res.sendStatus(200)

        } catch (e) {
            switch (e.code) {
                case '23505':
                    return res.status(409).json({ error: 'A cidade que você está tentando cadastrar já existe!' })
                case '23503':
                    return res.status(404).json({ error: 'O estado ou a cidade que foi informada não existe!' })
                default:
                    console.log(e)
                    return res.status(418).json(e)
            }
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params
            await connection('cidades').where('id', id).delete()
            return res.sendStatus(204)
        } catch (e) {
            console.log(e)
            return e
        }
    }
}