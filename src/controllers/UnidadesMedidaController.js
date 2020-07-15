const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        const { id } = req.params
        const unidade = await connection('unidades_medida')
            .select(['*'])
            .where({ id })

        if (unidade.length == 0)
            return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

        return res.json(unidade)
    },

    async list(req, res) {
        try {
            const itemsPerPage = 10
            const { page = 1 } = req.params
            const [{ count }] = await connection('unidades_medida').count()

            const unidades_medida = await connection('unidades_medida')
                .limit(10)
                .offset((page - 1) * itemsPerPage)
                .select(['*'])

            if (unidades_medida.length == 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            res.header('X-Total-Count', count)
            res.header('X-Total-Pages', Math.ceil(count / itemsPerPage))
            return res.json(unidades_medida)
        } catch (e) {
            return res.json(e.message)
        }
    },

    async create(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {
                const {
                    unidade,
                    und_equivalente,
                    qtd_equivalente
                } = req.body

                await connection('unidades_medida')
                    .insert({
                        unidade,
                        und_equivalente,
                        qtd_equivalente
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
        await connection('unidades_medida')
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
                    unidade,
                    und_equivalente,
                    qtd_equivalente
                } = req.body

                await connection('unidades_medida')
                    .update({
                        unidade,
                        und_equivalente,
                        qtd_equivalente
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