const controller = require('../controllers/ImageController')
const middleware = require('../middleware')
const Router = require('express').Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

Router.get('', controller.GetImage)
Router.post('', upload.single('file'), controller.CreateImage)

// Router.get('/image/:url', controller.GetS3Url)

// Router.post(
//   '/',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.UploadImage
// )
// Router.delete(
//   '/:id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.DeleteImage
// )

module.exports = Router
