const Router = require('express').Router()

const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ImageRouter = require('./ImageRouter')
const OrderRouter = require('./OrderRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/products', ProductRouter)
Router.use('/image', ImageRouter)
Router.use('/order', OrderRouter)

module.exports = Router
