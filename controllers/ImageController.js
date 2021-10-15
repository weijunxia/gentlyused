const { Image, User, Product } = require('../models')
const { GenerateUploadUrl } = require('../s3')
const uploader = require('../middleware/uploader')
// import { Image, User, Product } from '../models'
// import { GenerateUploadUrl } from '../s3'
// const GetS3Url = async (req, res) => {
//   try {
//     const url = await GenerateUploadUrl(req.body.filename)
//     res.send(url)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

// const UploadImage = async (req, res) => {
//   try {
//     const images = await Image.create({ req })
//     res.send(images)
//   } catch (error) {
//     throw error
//   }
// }

// const DeleteImage = async (req, res) => {
//   try {
//     await Image.destroy({ where: { id: req.params.id } })
//   } catch (error) {
//     throw error
//   }
// }
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
  CreateImage
}
