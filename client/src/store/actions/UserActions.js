import {
  GetAllUsers,
  GetUserProfile,
  GetUsersStore,
  GetUserFavorites,
  GetUserOrders,
  DeleteUser
} from '../../services/UserServices'

import {
  GET_ALL_USER_PROFILES,
  GET_USER_PROFILE,
  GET_USER_PROFILE_PRODUCTS,
  GET_USER_PROFILE_ORDERS,
  GET_USER_PROFILE_FAVORITES,
  DELETE_USER,
  GET_PRODUCT_FAVORITES
} from '../types'

export const LoadAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await GetAllUsers()
      dispatch({ type: GET_ALL_USER_PROFILES, payload: users })
    } catch (error) {
      throw error
    }
  }
}

export const LoadUserProfile = (id) => {
  return async (dispatch) => {
    try {
      const user = await GetUserProfile(id)
      dispatch({ type: GET_USER_PROFILE, payload: user })
    } catch (error) {
      throw error
    }
  }
}

export const LoadUserProfileProducts = (id) => {
  return async (dispatch) => {
    try {
      const userStore = await GetUsersStore(id)
      dispatch({ type: GET_USER_PROFILE_PRODUCTS, payload: userStore })
    } catch (error) {
      throw error
    }
  }
}

export const LoadUserFavorites = (id) => {
  return async (dispatch) => {
    try {
      const userFavorites = GetUserFavorites(id)
      dispatch({ type: GET_USER_PROFILE_FAVORITES, payload: userFavorites })
    } catch (error) {
      throw error
    }
  }
}

export const LoadUsersOrders = (id) => {
  return async (dispatch) => {
    try {
      const userOrders = await GetUserOrders(id)
      dispatch({ type: GET_USER_PROFILE_ORDERS, payload: userOrders })
    } catch (error) {
      throw error
    }
  }
}

export const DeleteUserProfile = (id) => {
  return async (dispatch) => {
    try {
      const deleteUser = await DeleteUser(id)
      dispatch({ type: DELETE_USER, payload: deleteUser })
    } catch (error) {
      throw error
    }
  }
}
