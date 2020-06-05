const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        try {
            const { id } = req.params

            const categoria = await connection('categorias')
                .where({ id })
                .select(['*'])

            if (categoria.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            return res.json(categoria)
        } catch (e) {
            return res.json({ msg: 'Erro ao pesquisar categoria!' })
        }
    },

    async list(req, res) {
        try {
            const { page = 1 } = req.params
            const itemsPerPage = 10

            const [{ count }] = await connection('categorias').count()

            const categorias = await connection('categorias')
                .limit(10)
                .offset((page - 1) * itemsPerPage)
                .select(['categorias.*'])

            if (categorias.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            res.header('X-Total-Count', count)
            res.header('X-Total-Pages', Math.ceil(count / itemsPerPage))
            return res.json(categorias)
        } catch (e) {
            return res.json({ msg: 'Erro ao listar categorias!' })
        }
    },

    async create(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {

                const { categoria } = req.body
                await connection('categorias')
                    .insert({ categoria })
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
            const result = validationResult(req)

            if (result.isEmpty()) {
                const { id } = req.params
                const { categoria } = req.body

                await connection('categorias')
                    .update({ categoria })
                    .where({ id })

                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() })
            }
        } catch (e) {
            return res.json(e)
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params
            await connection('categorias').where({ id }).delete()
            return res.sendStatus(204)
        } catch (e) {
            return res.json(e)
        }
    }
}