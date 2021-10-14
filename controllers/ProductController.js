const { Product, User, Order, Favorite } = require('../models')
const { Op } = require('sequelize')

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: User }
    })
    res.send(products)
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
  } catch (error) {
    throw error
  }
}

const GetAllFavoritesOneProduct = async (req, res) => {
  try {
    const id = req.params.id
    const favorites = await User.findAll({
      include: [
        {
          model: Product,
          as: 'product_favorite',
          where: { id: id }
        }
      ],
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
    console.log(req.body)
    const product = await Product.create(
      { ...req.body }
      // { where: { id: req.params.user_id } }
    )
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
  QueryProducts,
  GetProductDetails,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllFavoritesOneProduct
}
