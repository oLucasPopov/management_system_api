const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        const { id_cliente } = req.params
        const telefones = await connection('cliente_telefones')
            .where({ id_cliente })
            .select('*')

        if (telefones.length == 0)
            return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

        return res.json(telefones)
    },
    async create(req, res) {
        try {
            const {
                id_cliente,
                numero,
                tipo
            } = req.body

            const result = validationResult(req)
            if (result.isEmpty()) {
                await connection('cliente_telefones').insert({ id_cliente, numero, tipo })
                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() });
            }

        } catch (e) {
            return res.json(e)
        }
    },
    async update(req, res) {
        try {
            const {
                id_cliente,
                numero,
                tipo
            } = req.body
            const { id } = req.params
            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('cliente_telefones')
                    .update({ id_cliente, numero, tipo })
                    .where({ id })

                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() });
            }
        } catch (e) {
            return res.json(e)
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            await connection('cliente_telefones').where({ id }).delete()
            return res.sendStatus(204)
        } catch (e) {
            return res.json(e)
        }
    },
}