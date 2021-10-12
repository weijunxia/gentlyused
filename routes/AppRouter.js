const Router = require('express').Router()

const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)
Router.use('/products', ProductRouter)

module.exports = Router
