const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async list(req, res) {
        try {
            const { pro_codigo } = req.params
            const composicao = await connection('composicao_produtos')
                .where({ pro_codigo })
                .select('*')

            return res.json(composicao)
        } catch (e) {
            return res.json(e.message)
        }
    },
    async create(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {
                const {
                    pro_codigo,
                    pro_composicao,
                    quantidade
                } = req.body

                await connection('composicao_produtos')
                    .insert({
                        pro_codigo,
                        pro_composicao,
                        quantidade
                    })

                return res.sendStatus(204)
            } else {
                res.status(409).json({ errors: result.array() })
            }

        } catch (e) {
            return res.json(e)
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params
            await connection('composicao_produtos').where({ id }).delete()
            return res.sendStatus(204)
        } catch (e) {
            return res.json(e)
        }
    },
}