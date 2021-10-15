const { User, Favorite, Product } = require('../models')
const { Op } = require('sequelize')

const AddToFavorites = async (req, res) => {
  try {
    const fav = Favorite.create({ ...req.body })

    await res.send(fav)
  } catch (error) {
    throw error
  }
}

const RemoveFromFavorites = async (req, res) => {
  try {
    await Favorite.destroy({ where: { product_id: req.params.product_id } })
    res.send({
      msg: 'Removed From Favorites',
      payload: req.params.product_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddToFavorites,
  RemoveFromFavorites
}
