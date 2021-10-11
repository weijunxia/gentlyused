const { User, Favorite } = require('../models')
const { Op } = require('sequelize')

const AddToFavorites = async (req, res) => {
  try {
    const addFavorite = await Favorite.create({ ...req.body })
    res.send(addFavorite)
  } catch (error) {
    throw error
  }
}

const RemoveFromFavorites = async (req, res) => {
  try {
    await Favorite.destroy({where: {product_id: req.params.product_id}})
    res.send({
      msg: "Removed From Favorites",
      payload: req.params.product_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

const GetAllFavoritesOneProduct = async (req, res) => {
  try {
    const id = req.params.product_id
    const favorites = Favorite.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password_digest']
          }
        },
      ],
      where: {id = favorites.favorite_favoirte_id}
    })
    res.send(favorites)
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddToFavorites,
  RemoveFromFavorites,
  GetAllFavoritesOneProduct
}
