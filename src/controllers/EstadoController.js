const connection = require('../database/connection')

module.exports = {
    async search(req, res) {
        const { id } = req.params
        const estados = await connection('estados').where('id', id).select(['id', 'estado'])
        return res.json(estados)
    },
    async list(req, res) {
        const { page = 1 } = req.query
        const [count] = await connection('estados').count()

        const estados = await connection('estados')
            .orderBy('id')
            .limit(10)
            .offset((page - 1) * 5)
            .select(['id', 'estado'])

        res.header('X-Total-Count', count['count(*)'])
        return res.json(estados)
    },
    async create(req, res) {
        try {
            const estado = req.body.estado
            await connection('estados').insert({ estado })
            return res.sendStatus(200)
        } catch (e) {
            if (e.code == 23505)
                return res.status(409).json({ error: 'Estado já existe!' })
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params
            const { estado } = req.body
            const update = await connection('estados')
                .where('id', '=', id)
                .update({ estado })

            return res.send(200).json(update)
        } catch (e) {
            if (e.code == 23505)
                return res.status(409).json({ error: 'Estado já existe!' })
        }
    },
    async delete(req, res) {
        const { id } = req.params
        await connection('estados').where('id', id).delete()
        return res.sendStatus(204)
    },
}