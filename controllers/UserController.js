const { User, Product, Order } = require('../models')

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

const GetUserProfile = async (req, res) => {
  try {
    const userProfile = await User.findByPk(req.params.id)
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

const GetUserProfileFavorites = async (req, res) => {
  try {
    const userFavorites = await User.findByPk(req.params.id, {
      include: [{ model: Favorite }]
    })
    res.send(userFavorites)
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
  GetUserProfile,
  GetUserProfileProducts,
  GetUserProfileOrders,
  GetUserProfileFavorites,
  DeleteUser
}
