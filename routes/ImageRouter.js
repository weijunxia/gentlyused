const controller = require('../controllers/ImageController')
const middleware = require('../middleware')
const Router = require('express').Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

Router.get('/all', controller.GetAllImage)
Router.get('/product/:id', controller.GetImageByProductId)
Router.get('/user/:id', controller.GetImagesByUserId)
Router.post(
  '/upload',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('file_name'),
  controller.CreateImage
)

Router.delete(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteImage
)

module.exports = Router
