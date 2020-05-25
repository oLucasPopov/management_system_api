const cliente = require('./clienteValidations')
const clienteTelefone = require('./clienteTelefoneValidations')
const clienteEndereco = require('./clienteEnderecoValidations')
const cidade = require('./cidadeValidations')
const estado = require('./estadoValidations')

module.exports = {
    estado,
    cidade,
    cliente,
    clienteTelefone,
    clienteEndereco,
}