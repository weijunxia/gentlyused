const Router = require('express').Router()
const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ImageRouter = require('./ImageRouter')
const OrderRouter = require('./OrderRouter')
const FavoriteRouter = require('./FavoriteRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/products', ProductRouter)
Router.use('/images', ImageRouter)
Router.use('/order', OrderRouter)
Router.use('/favorites', FavoriteRouter)

module.exports = Router
