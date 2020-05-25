const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        const { id } = req.params
        const cliente = await connection('clientes')
            .select('*')
            .where({id})
        return res.json(cliente)
    },

    async list(req, res) {
        try {
            const itemsPerPage = 10
            const { page = 1 } = req.params
            const [count] = await connection('clientes').count()

            const clientes = await connection('clientes')
                .limit(10)
                .offset((page - 1) * itemsPerPage)
                .select(['clientes.*']).groupBy('clientes.id')

            res.header('X-Total-Count', count['count'])
            res.header('X-Total-Pages', Math.ceil(count['count'] / itemsPerPage))
            return res.json(clientes)
        } catch (e) {
            return res.json(e.message)
        }
    },

    async create(req, res) {
        try {
            const {
                tipo_pessoa,
                nome,
                data_nascimento,
                sexo,
                rg,
                cpf,
                cnpj,
                email,
                bloqueado,
                enderecos,
                telefones
            } = req.body

            const result = validationResult(req)

            if (result.isEmpty()) {
                const [id] = await connection('clientes')
                    .returning('id')
                    .insert({
                        tipo_pessoa,
                        nome,
                        data_nascimento,
                        sexo,
                        rg,
                        cpf,
                        cnpj,
                        email,
                        bloqueado
                    })

                enderecos.forEach((endereco) => {
                    endereco.id_cliente = id
                })

                telefones.forEach((telefone) => {
                    telefone.id_cliente = id
                })

                await connection('cliente_enderecos').insert(enderecos)
                await connection('cliente_telefones').insert(telefones)
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
                tipo_pessoa,
                nome,
                data_nascimento,
                sexo,
                rg,
                cpf,
                cnpj,
                email,
                bloqueado,
            } = req.body

            const { id } = req.params
            const result = validationResult(req)

            if (result.isEmpty()) {
                await connection('clientes').
                    update({
                        tipo_pessoa,
                        nome,
                        data_nascimento,
                        sexo,
                        rg,
                        cpf,
                        cnpj,
                        email,
                        bloqueado
                    }).where({ id })
                return res.sendStatus(204)
            } else {
                return res.status(409).json({ errors: result.array() });
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    },

    async delete(req, res) {
        const { id } = req.params
        await connection('clientes').where({ id }).delete()
        return res.sendStatus(204)
    },
}