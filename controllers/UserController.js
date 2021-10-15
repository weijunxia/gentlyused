const { User, Product, Order, Favorite } = require('../models')
const { Op } = require('sequelize')

const GetAllUserProfiles = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { deleted: false }
    })
    res.send(users)
  } catch (error) {
    throw error
  }
}
const GetUsernameProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne({
      where: {
        username: req.params.username
      },
      attributes: {
        exclude: ['password_digest', 'email']
      }
    })
    res.send(userProfile)
  } catch (error) {
    throw error
  }
}

const GetUserEmailProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne({
      where: {
        email: req.params.email
      },
      attributes: {
        exclude: ['password_digest', 'email']
      }
    })
    res.send(userProfile)
  } catch (error) {
    throw error
  }
}

const GetUserProfileProducts = async (req, res) => {
  try {
    const userAndProducts = await User.findByPk(req.params.id, {
      include: [{ model: Product, as: 'users_products' }]
    })
    res.send(userAndProducts)
  } catch (error) {
    throw error
  }
}

const GetUserProfileOrders = async (req, res) => {
  try {
    const userAndOrders = await User.findByPk(req.params.id, {
      include: [{ model: Order }]
    })
    res.send(userAndOrders)
  } catch (error) {
    throw error
  }
}
const AddOrRemoveUserFavoriteProduct = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      },
      include: [{ model: Product, as: 'user_favorite' }]
    })
    const userFavorites = user.dataValues.user_favorite
    const product = await Product.findOne({
      where: {
        id: req.body.id
      }
    })
    if (userFavorites.includes(product)) {
      let productIndex = userFavorites.indexOf(product)
      userFavorites.splice(productIndex, 1)
      res.send(userFavorites)
    } else {
      userFavorites.splice(0, 0, product)
      res.send(userFavorites)
    }
  } catch (error) {
    throw error
  }
}

const GetUserProfileFavorites = async (req, res) => {
  try {
    console.log(req.params.username)
    const userFavorites = await User.findOne({
      where: { username: req.params.username },
      include: [{ model: Product, as: 'user_favorite' }]
    })
    res.send(userFavorites.dataValues.user_favorite)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    user.deleted = true
    res.send({
      msg: 'Your Account has been Deleted',
      payload: req.params.user_id,
      status: 'Ok',
      user
    })
    user.save()
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllUserProfiles,
  GetUsernameProfile,
  GetUserEmailProfile,
  GetUserProfileProducts,
  GetUserProfileOrders,
  AddOrRemoveUserFavoriteProduct,
  GetUserProfileFavorites,
  DeleteUser
}
