const { Image, User, Product } = require('../models')
const uploader = require('../middleware/uploader')
const path = require('path')
const DeleteImage = async (req, res) => {
  try {
    await Image.destroy({ where: { id: req.params.id } })
    res.send({
      msg: 'Your Post has been Deleted',
      payload: req.params.image_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}
const GetImage = async (req, res) => {
  try {
    const response = await Image.findAll()
    res.send(response)
  } catch (error) {
    throw error
  }
}
const CreateImage = async (req, res) => {
  try {
    let file = req.file
    // let productId = req.body.image_product_id
    const image = await Image.build({ ...req.body })
    image.validate()
    let fileName = `${new Date().getTime()}-${path.extname(file.originalname)}`
    let fileParams = {
      Key: `${fileName}`,
      Body: file.buffer,
      ACL: 'public-read',
      Bucket: 'gently-used',
      ContentEncoding: file.encoding,
      ContentLength: file.size,
      ContentType: file.mimetype
    }
    await uploader.upload(fileParams)
    // const image = await Image.create({
    //   ...req.body,
    //   file_name: `https://d1p3fszk6htgk4.cloudfront.net/${fileName}`
    // })
    image.file_name = `https://d1p3fszk6htgk4.cloudfront.net/${fileName}`
    image.save()
    res.send(image)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetImage,
  CreateImage,
  DeleteImage
}
