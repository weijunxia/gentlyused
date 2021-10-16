import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../types'

const iState = {
  userFavorites: []
}

const FavoriteReducer = (state = iState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, userFavorites: action.payload }
    case REMOVE_FROM_FAVORITES:
      return { ...state, userFavorites: action.payload }
    default:
      return state
  }
}
export default FavoriteReducer
