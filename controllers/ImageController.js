const { Image, User, Product } = require('../models')

const UploadImage = async (req, res) => {
  try {
    const images = await Image.create({ req })
    res.send(images)
  } catch (error) {
    throw error
  }
}

module.exports = {
  UploadImage
}
