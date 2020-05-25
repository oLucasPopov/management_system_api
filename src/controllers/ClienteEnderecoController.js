const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        const { id_cliente } = req.params
        const enderecos = await connection('cliente_enderecos')
            .where({ id_cliente })
            .select('*')
        return res.json(enderecos)
    },
    async create(req, res) {
        try {
            const {
                id_cliente,
                id_cidade,
                rua,
                numero,
                bairro,
                complemento } = req.body

            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('cliente_enderecos')
                    .insert({
                        id_cliente,
                        id_cidade,
                        rua,
                        numero,
                        bairro,
                        complemento
                    })
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
                id_cidade,
                rua,
                numero,
                bairro,
                complemento } = req.body
            const { id } = req.params
            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('cliente_enderecos')
                    .update({
                        id_cidade,
                        rua,
                        numero,
                        bairro,
                        complemento
                    })
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
        const { id } = req.params
        await connection('cliente_enderecos').where({ id }).delete()
        return res.sendStatus(204)
    },
}