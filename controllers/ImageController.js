const { Image, User, Product } = require('../models')

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
  DeleteImage
}
