const controller = require('../controllers/OrderController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateOrder
)
Router.delete(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteOrder
)

module.exports = Router
