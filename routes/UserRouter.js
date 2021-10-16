const controller = require('../controllers/UserController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.get('/', controller.GetAllUserProfiles)
Router.get('/:username', controller.GetUsernameProfile)
Router.get('/email/:email', controller.GetUserEmailProfile)
Router.get('/shop/:id', controller.GetUserProfileProducts)
Router.get('/favorites/:username', controller.GetUserProfileFavorites)

Router.get(
  '/orders/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfileOrders
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)

module.exports = Router
