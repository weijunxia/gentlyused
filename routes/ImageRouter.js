const controller = require('../controllers/ImageController')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UploadImage
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteImage
)

module.exports = Router