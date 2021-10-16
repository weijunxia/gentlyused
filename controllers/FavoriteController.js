const { User, Favorite, Product } = require('../models')
const { Op } = require('sequelize')

const AddToFavorites = async (req, res) => {
  try {
    const fav = await Favorite.create({ ...req.body })
    return res.send(fav)
  } catch (error) {
    throw error
  }
}

const RemoveFromFavorites = async (req, res) => {
  try {
    await Favorite.destroy({ where: { id: req.params.id } })
    res.send({
      msg: 'Removed From Favorites',
      payload: req.params.id,
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
