const cliente = require('./clienteValidations')
const clienteTelefone = require('./clienteTelefoneValidations')
const clienteEndereco = require('./clienteEnderecoValidations')
const cidade = require('./cidadeValidations')
const estado = require('./estadoValidations')
const categoria = require('./categoriaValidations')
const subcategoria = require('./subcategoriaValidations')
const marca = require('./marcaValidations')
const unidadesMedida = require('./unidadesMedidaValidations')
const produto = require('./produtoValidations')
const composicaoProduto = require('./composicaoProdutoValidations')

module.exports = {
    estado,
    cidade,
    cliente,
    clienteTelefone,
    clienteEndereco,
    categoria,
    subcategoria,
    marca,
    unidadesMedida,
    produto,
    composicaoProduto,
}