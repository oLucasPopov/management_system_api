const express = require('express')
const routes = express.Router();
const validations = require('./validations/routesValidations')

const EstadoController = require('./controllers/EstadoController')
routes.post('/estados', validations.estado, EstadoController.create)
routes.get('/estados/list/:page', EstadoController.list)
routes.get('/estados/:id', EstadoController.search)
routes.put('/estados/:id', validations.estado, EstadoController.update)
routes.delete('/estados/:id', EstadoController.delete)

const CidadeController = require('./controllers/CidadeController')
routes.post('/cidades', validations.cidade, CidadeController.create)
routes.get('/cidades/list/:page', CidadeController.list)
routes.get('/cidades/:id', CidadeController.search)
routes.put('/cidades/:id', validations.cidade, CidadeController.update)
routes.delete('/cidades/:id', CidadeController.delete)

const ClienteController = require('./controllers/ClienteController')
routes.post('/clientes', validations.cliente, ClienteController.create)
routes.get('/clientes/list/:page', ClienteController.list)
routes.get('/clientes/:id', ClienteController.search)
routes.put('/clientes/:id', validations.cliente, ClienteController.update)
routes.delete('/clientes/:id', ClienteController.delete)

const ClienteEnderecoController = require('./controllers/ClienteEnderecoController')
routes.post('/cliente_enderecos', validations.clienteEndereco, ClienteEnderecoController.create)
routes.get('/cliente_enderecos/:id_cliente', ClienteEnderecoController.search)
routes.put('/cliente_enderecos/:id', validations.clienteEndereco, ClienteEnderecoController.update)
routes.delete('/cliente_enderecos/:id', ClienteEnderecoController.delete)

const ClienteTelefoneController = require('./controllers/ClienteTelefoneController')
routes.post('/cliente_telefones', validations.clienteTelefone, ClienteTelefoneController.create)
routes.get('/cliente_telefones/:id_cliente', ClienteTelefoneController.search)
routes.put('/cliente_telefones/:id', validations.clienteTelefone, ClienteTelefoneController.update)
routes.delete('/cliente_telefones/:id', ClienteTelefoneController.delete)

const CategoriasController = require('./controllers/CategoriasController')
routes.post('/categorias', validations.categoria, CategoriasController.create)
routes.get('/categorias/list/:page', CategoriasController.list)
routes.get('/categorias/:id', CategoriasController.search)
routes.put('/categorias/:id', validations.categoria, CategoriasController.update)
routes.delete('/categorias/:id', CategoriasController.delete)
 
const SubcategoriasController = require('./controllers/SubcategoriasController')
routes.post('/subcategorias', validations.subcategoria, SubcategoriasController.create)
routes.get('/subcategorias/list/:page', validations.subcategoria, SubcategoriasController.list)
routes.get('/subcategorias/:id_categoria', SubcategoriasController.search)
routes.put('/subcategorias/:id', validations.subcategoria, SubcategoriasController.update)
routes.delete('/subcategorias/:id', SubcategoriasController.delete)


module.exports = routes;