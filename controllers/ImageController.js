const { Image, User, Product } = require('../models')
const uploader = require('../middleware/uploader')

const DeleteImage = async (req, res) => {
  try {
    await Image.destroy({ where: { id: req.params.id } })
  } catch (error) {
    throw error
  }
}
const GetImage = async (req, res) => {
  try {
    console.log(req.body)
  } catch (error) {
    throw error
  }
}
const CreateImage = async (req, res) => {
  try {
    let file = req.file
    let fileParams = {
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
      Bucket: 'gently-used',
      ContentEncoding: file.encoding,
      ContentLength: file.size,
      ContentType: file.mimetype
    }
    let fileUrl = await uploader.upload(fileParams)
    const image = await Image.create({
      ...req.body,
      file_name: fileUrl
    })
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
