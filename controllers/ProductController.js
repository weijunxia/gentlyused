const { Product, User, Order, Favorite } = require('../models')
const { Op } = require('sequelize')

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: User },
      order: [['id', 'DESC']]
    })
    res.send(products)
  } catch (error) {
    throw error
  }
}
const GetAllProductsAndFavorites = async (req, res) => {
  try {
    const productsAndFavorites = await Product.findAll({
      include: { model: User, as: 'product_favorite' },
      attributes: {
        exclude: ['password_digest']
      }
    })
    res.send(productsAndFavorites)
  } catch (error) {
    throw error
  }
}
const QueryProducts = async (req, res) => {
  try {
    const query = req.params.query
    const searchResult = await Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: '%' + query + '%' } },
          { description: { [Op.iLike]: '%' + query + '%' } }
        ]
      }
    })
    res.send(search)
  } catch (error) {
    throw error
  }
}

const GetAllImagesByProduct = async (req, res) => {
  try {
    const id = req.params.id
    const image = await Product.findAll({
      where: { id: id },
      attributes: {
        exclude: ['password_digest']
      },
      include: [{ model: User, as: 'product_images' }]
    })
    res.send(image)
  } catch (error) {
    throw error
  }
}

const GetAllFavoritesOneProduct = async (req, res) => {
  try {
    const id = req.params.id
    const favorites = await Product.findAll({
      where: { id: id },
      include: {
        model: User,
        as: 'product_favorite'
      },
      attributes: {
        exclude: ['password_digest']
      }
    })
    res.send(favorites)
  } catch (error) {
    throw error
  }
}

const GetProductDetails = async (req, res) => {
  try {
    const productDetails = await Product.findByPk(req.params.id)
    res.send(productDetails)
  } catch (error) {
    throw error
  }
}
const CreateProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body })
    res.send(product)
  } catch (error) {
    throw error
  }
}

const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.update(
      { ...req.body },
      { where: { id: req.params.id }, returning: true }
    )
    res.send(product)
  } catch (error) {
    throw error
  }
}

const DeleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } })
    res.send({
      msg: 'Your Post has been Deleted',
      payload: req.params.product_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllProducts,
  GetAllProductsAndFavorites,
  QueryProducts,
  GetProductDetails,
  GetAllImagesByProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllFavoritesOneProduct
}
