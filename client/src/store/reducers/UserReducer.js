import {
  GET_ALL_USER_PROFILES,
  GET_USER_PROFILE,
  GET_USER_PROFILE_PRODUCTS,
  GET_USER_PROFILE_ORDERS,
  GET_USER_PROFILE_FAVORITES,
  DELETE_USER,
  GET_PRODUCT_FAVORITES
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
    case GET_USER_PROFILE:
      return { ...state, individualUser: action.payload }
    case GET_USER_PROFILE_PRODUCTS:
      return { ...state, individualUserProducts: action.payload }
    case GET_USER_PROFILE_ORDERS:
      return { ...state, individualUserOrders: action.payload }
    case GET_USER_PROFILE_FAVORITES:
      return { ...state, individualUserFavorites: action.payload }
    case DELETE_USER:
      return { ...state, individualUser: action.payload }
    default:
      return { ...state }
  }
}

export default UserReducer
