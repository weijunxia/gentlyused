const { User, Product, Order } = require('../models')

const GetAllUserProfiles = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserProfileProducts = async (req, res) => {
  try {
    const userAndProducts = await User.findByPk(req.params.id, {
      include: [{ model: Product }]
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

const GetUserProfileFavorites = async (req, res) => {
  try {
    const userFavorites = await User.findByPk(req.params.id, {
      include: [{ model: Favorites }]
    })
    res.send(userFavorites)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllUserProfiles,
  GetUserProfileProducts,
  GetUserProfileOrders,
  GetUserProfileFavorites
}
