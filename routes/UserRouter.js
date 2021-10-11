const controller = require('../controllers/UserController')
const Router = require('express').Router()

Router.get('/', controller.GetAllUserProfiles)
Router.get('/:id', controller.GetUserProfile)
Router.get('/shop/:id', controller.GetUserProfileProducts)
Router.get('/favorites/:id', controller.GetUserProfileFavorites)
Router.get('/orders/:id', controller.GetUserProfileOrders)

module.exports = Router
