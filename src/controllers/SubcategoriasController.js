const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async list(req, res) {
        try {
            const itemsPerPage = 10
            const { page = 1 } = req.params
            const [{ count }] = await connection('subcategorias').count()

            const subcategorias = await connection('subcategorias')
                .select(['*'])
                .limit(10)
                .offset((page - 1) * itemsPerPage)

            if (subcategorias.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            res.header('X-Total-Count', count)
            res.header('X-Total-Pages', Math.ceil(count / itemsPerPage))
            return res.json(subcategorias)
        } catch (e) {
            return res.json(e)
        }
    },

    async search(req, res) {
        try {
            const { id_categoria } = req.params
            const subcategorias = await connection('subcategorias')
                .where({ id_categoria })
                .select(['*'])

            if (subcategorias.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            return res.json(subcategorias)

        } catch (e) {
            return res.json(e)
        }
    },

    async create(req, res) {
        try {
            const {
                id_categoria,
                subcategoria
            } = req.body

            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('subcategorias')
                    .insert({ id_categoria, subcategoria })

                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() })
            }

        } catch (e) {
            return res.json(e)
        }
    },

    async update(req, res) {
        try {

            const { id } = req.params
            const { id_categoria, subcategoria } = req.body

            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('subcategorias')
                    .update({ id_categoria, subcategoria })
                    .where({ id })
                return res.sendStatus(204)
            } else {
                return res.json({ errors: result.array() })
            }

        } catch (e) {
            return res.json(e)
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params
            await connection('subcategorias').where({ id }).delete()
            return res.sendStatus(200)
        } catch (e) {
            return res.json(e)
        }
    }
}