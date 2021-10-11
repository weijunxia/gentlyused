const controller = require('../controllers/UserController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.get('/', controller.GetAllUserProfiles)
Router.get('/:id', controller.GetUserProfile)
Router.get('/shop/:id', controller.GetUserProfileProducts)
Router.get(
  '/favorites/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfileFavorites
)
Router.get(
  '/orders/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfileOrders
)

module.exports = Router
