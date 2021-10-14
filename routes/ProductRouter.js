const controller = require('../controllers/ProductController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.get('/', controller.GetAllProducts)
Router.get('/:id', controller.GetProductDetails)
Router.get('/:id/favorite', controller.GetAllFavoritesOneProduct)
Router.get('/search/:query', controller.QueryProducts)
Router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.CreateProduct
)
Router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateProduct
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteProduct
)

module.exports = Router
