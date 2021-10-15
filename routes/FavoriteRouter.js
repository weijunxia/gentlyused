const controller = require('../controllers/FavoriteController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.post('/', controller.AddToFavorites)
Router.delete('/:id', controller.RemoveFromFavorites)

module.exports = Router
