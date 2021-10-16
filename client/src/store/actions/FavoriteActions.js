import {
  AddToFavorites,
  RemoveFromFavorites
} from '../../services/FavoriteServices'

import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../types'

export const AddFavorite = async (userId, productId) => {
  return async (dispatch) => {
    try {
      const favorite = await AddToFavorites(userId, productId)
      dispatch({ type: ADD_TO_FAVORITES, dispatch: favorite.data })
    } catch (error) {
      throw error
    }
  }
}

export const RemoveFavorite = async (id) => {
  return async (dispatch) => {
    try {
      const remove = await RemoveFromFavorites(id)
      dispatch({ type: REMOVE_FROM_FAVORITES, payload: remove.data })
    } catch (error) {
      throw error
    }
  }
}
