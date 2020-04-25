const express = require('express')
const routes = express.Router();

const EstadoController = require('./controllers/EstadoController')
routes.post('/estados', EstadoController.create)
routes.get('/estados/:page', EstadoController.list)
routes.get('/estados/:id', EstadoController.search)
routes.put('/estados/:id', EstadoController.update)
routes.delete('/estados/:id', EstadoController.delete)

const CidadeController = require('./controllers/CidadeController')
routes.post('/cidades', CidadeController.create)
routes.get('/cidades/:page', CidadeController.list)
routes.get('/cidades/:id', CidadeController.search)
routes.put('/cidades/:id', CidadeController.update)
routes.delete('/cidades/:id', CidadeController.delete)

module.exports = routes;