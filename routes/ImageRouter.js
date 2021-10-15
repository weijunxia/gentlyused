const controller = require('../controllers/ImageController')
const middleware = require('../middleware')
const Router = require('express').Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

Router.get('', controller.GetImage)
Router.post(
  '',
  upload.single('file'),
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateImage
)

Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteImage
)

module.exports = Router
