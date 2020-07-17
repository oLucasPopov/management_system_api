const connection = require('../database/connection')
const { validationResult } = require('express-validator')

module.exports = {
    async search(req, res) {
        try {
            const { id } = req.params
            const produto = await connection('produtos')
                .select('produtos.*', 'marcas.marca', 'unidades_medida.unidade')
                .where('produtos.id', id)
                .leftJoin('marcas', 'marcas.id', 'produtos.id')
                .leftJoin('unidades_medida', 'unidades_medida.id', 'produtos.id')

            if (produto.length === 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            return res.json(produto)

        } catch (e) {
            return res.json(e.message)
        }
    },
    async list(req, res) {
        try {
            const produto = await connection('produtos')
                .select('produtos.*', 'marcas.marca', 'unidades_medida.unidade')
                .leftJoin('marcas', 'marcas.id', 'produtos.id')
                .leftJoin('unidades_medida', 'unidades_medida.id', 'produtos.id')

            if (produto.length === 0)
                return res.status(404).json({ msg: 'Nenhum registro encontrado!' })

            return res.json(produto)
        } catch (e) {
            return res.json(e.message)
        }
    },
    async create(req, res) {
        try {
            const result = validationResult(req)

            if (result.isEmpty()) {
                const {
                    id_unidade,
                    id_marca,
                    id_categoria,
                    id_subcategoria,
                    tipo,
                    descricao,
                    localizacao,
                    codigo_barras,
                    estoque,
                    estoque_minimo
                } = req.body

                await connection('produtos')
                    .insert({
                        id_unidade,
                        id_marca,
                        id_categoria,
                        id_subcategoria,
                        tipo,
                        descricao,
                        localizacao,
                        codigo_barras,
                        estoque,
                        estoque_minimo
                    })

                return res.sendStatus(204)
            } else {
                res.status(409).json({ errors: result.array() })
            }

        } catch (e) {
            return res.json(e)
        }
    },

    async update(req, res) {
        try {
            result = validationResult(req)

            if (result.isEmpty()) {
                const { id } = req.params
                const {
                    id_unidade,
                    id_marca,
                    id_categoria,
                    id_subcategoria,
                    tipo,
                    descricao,
                    localizacao,
                    codigo_barras,
                    estoque,
                    estoque_minimo
                } = req.body

                await connection('produtos').update({
                    id_unidade,
                    id_marca,
                    id_categoria,
                    id_subcategoria,
                    tipo,
                    descricao,
                    localizacao,
                    codigo_barras,
                    estoque,
                    estoque_minimo
                }).where({ id })

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
            await connection('produtos').where({ id }).delete()
            return res.sendStatus(204)
        } catch (e) {
            return res.json(e)
        }
    },
}