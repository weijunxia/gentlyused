import {
  GetAllUsers,
  GetUsersStore,
  GetUserFavorites,
  GetUserOrders,
  DeleteUser,
  GetUsernameProfile,
  GetUserEmailProfile,
  AddOrRemoveUserFavorite
} from '../../services/UserServices'

import {
  GET_ALL_USER_PROFILES,
  GET_USERNAME_PROFILE,
  GET_USER_EMAIL_PROFILE,
  GET_USER_PROFILE_PRODUCTS,
  GET_USER_PROFILE_ORDERS,
  GET_USER_PROFILE_FAVORITES,
  DELETE_USER
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

export const LoadUsernameProfile = (username) => {
  return async (dispatch) => {
    try {
      const user = await GetUsernameProfile(username)
      dispatch({ type: GET_USERNAME_PROFILE, payload: user })
    } catch (error) {
      throw error
    }
  }
}

export const LoadUserEmailProfile = (email) => {
  return async (dispatch) => {
    try {
      const user = await GetUserEmailProfile(email)
      dispatch({ type: GET_USER_EMAIL_PROFILE, payload: user })
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

export const LoadUserFavorites = (username) => {
  return async (dispatch) => {
    try {
      const userFavorites = GetUserFavorites(username)
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
