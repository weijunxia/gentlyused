import {
  AddToFavorites,
  RemoveFromFavorites
} from '../../services/FavoriteServices'

import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../types'

export const AddFavorite = ({ favorite_user_id, favorite_product_id }) => {
  return async (dispatch) => {
    try {
      const favorite = await AddToFavorites({
        favorite_user_id,
        favorite_product_id
      })
      dispatch({ type: ADD_TO_FAVORITES, payload: favorite })
    } catch (error) {
      throw error
    }
  }
}

export const RemoveFavorite = (id) => {
  return async (dispatch) => {
    try {
      const remove = await RemoveFromFavorites(id)
      dispatch({ type: REMOVE_FROM_FAVORITES, payload: remove })
    } catch (error) {
      throw error
    }
  }
}
