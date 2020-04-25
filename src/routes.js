const express = require('express')
const routes = express.Router();

const EstadoController = require('./controllers/EstadoController')
routes.post('/estados', EstadoController.create)
routes.get('/estados', EstadoController.list)
routes.get('/estados/:id', EstadoController.search)
routes.put('/estados/:id', EstadoController.update)
routes.delete('/estados/:id', EstadoController.delete)

module.exports = routes;