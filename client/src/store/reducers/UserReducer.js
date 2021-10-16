import {
  GET_ALL_USER_PROFILES,
  GET_USERNAME_PROFILE,
  GET_USER_EMAIL_PROFILE,
  GET_USER_PROFILE_PRODUCTS,
  GET_USER_PROFILE_ORDERS,
  GET_USER_PROFILE_FAVORITES,
  DELETE_USER,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from '../types'

const iState = {
  users: [],
  individualUser: [],
  individualUserProducts: [],
  individualUserOrders: [],
  individualUserFavorites: [],
  usersLoading: ''
}

const UserReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_ALL_USER_PROFILES:
      return { ...state, users: action.payload }
    case GET_USERNAME_PROFILE:
      return { ...state, individualUser: action.payload }
    case GET_USER_EMAIL_PROFILE:
      return { ...state, individualUser: action.payload }
    case GET_USER_PROFILE_PRODUCTS:
      return { ...state, individualUserProducts: action.payload }
    case GET_USER_PROFILE_ORDERS:
      return { ...state, individualUserOrders: action.payload }
    case GET_USER_PROFILE_FAVORITES:
      return { ...state, individualUserFavorites: action.payload }
    // case REMOVE_FROM_FAVORITES:
    //   let userFavorite = state.individualUserFavorites
    //   userFavorite.filter((favorite) => {
    //     if (favorite.id === action.payload.id) {
    //       return userFavorite.splice(
    //         userFavorite.indexOf(favorite),
    //         1,
    //         favorite
    //       )
    //     } else {
    //       return userFavorite.splice(0, 0, favorite)
    //     }
    //   })
    //   state.individualUserFavorites = userFavorite
    //   return { ...state, individualUserFavorites: userFavorite }
    // case ADD_TO_FAVORITES:
    //   let userFavorites = state.individualUserFavorites
    //   userFavorites.filter((favorite) => {
    //     if (favorite.id === action.payload.id) {
    //       return userFavorites.splice(
    //         userFavorites.indexOf(favorite),
    //         1,
    //         favorite
    //       )
    //     } else {
    //       return userFavorites.splice(0, 0, favorite)
    //     }
    //   })
    //   state.individualUserFavorites = userFavorites
    //   return { ...state, individualUserFavorites: userFavorites }
    case DELETE_USER:
      return { ...state, individualUser: action.payload }
    default:
      return { ...state }
  }
}

export default UserReducer
