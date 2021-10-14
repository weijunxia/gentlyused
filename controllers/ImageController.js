const { Image, User, Product } = require('../models')
const { GenerateUploadUrl } = require('../s3')
// import { Image, User, Product } from '../models'
// import { GenerateUploadUrl } from '../s3'
const GetS3Url = async (req, res) => {
  try {
    const url = await GenerateUploadUrl(req.body.filename)
    res.send(url)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const UploadImage = async (req, res) => {
  try {
    const images = await Image.create({ req })
    res.send(images)
  } catch (error) {
    throw error
  }
}

const DeleteImage = async (req, res) => {
  try {
    await Image.destroy({ where: { id: req.params.id } })
  } catch (error) {
    throw error
  }
}

module.exports = {
  UploadImage,
  DeleteImage,
  GetS3Url
}
