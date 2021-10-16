const controller = require('../controllers/FavoriteController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddToFavorites
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.RemoveFromFavorites
)

module.exports = Router
