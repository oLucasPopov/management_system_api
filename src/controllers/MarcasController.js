const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        const { id } = req.params
        const marca = await connection('marcas')
            .select(['*'])
            .where({ id })

        if (marca.length == 0)
            return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

        return res.json(marca)
    },

    async list(req, res) {
        try {
            const itemsPerPage = 10
            const { page = 1 } = req.params
            const [{ count }] = await connection('marcas').count()

            const marcas = await connection('marcas')
                .limit(10)
                .offset((page - 1) * itemsPerPage)
                .select(['*'])

            if (marcas.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            res.header('X-Total-Count', count)
            res.header('X-Total-Pages', Math.ceil(count / itemsPerPage))
            return res.json(marcas)
        } catch (e) {
            return res.json(e.message)
        }
    },

    async create(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {
                const {
                    marca
                } = req.body

                await connection('marcas')
                    .insert({
                        marca
                    })

                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() })
            }
        } catch (e) {
            return res.json(e)
        }
    },

    async delete(req, res) {
        const { id } = req.params
        await connection('marcas')
            .where({ id })
            .delete()
        return res.sendStatus(204)
    },

    async update(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {
                const { id } = req.params

                const {
                    marca
                } = req.body

                await connection('marcas')
                    .update({
                        marca
                    })
                    .where({ id })
                return res.sendStatus(204)

            } else {
                return res.status(409).json({ errors: result.array() })
            }
        } catch (e) {
            return res.json(e);
        }
    }
}