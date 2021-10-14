import {
  SignInUser,
  RegisterUser,
  CheckSession
} from '../../services/AuthServices'

import {
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  AUTH_MODAL_TOGGLE,
  TOGGLE_REGISTER,
  TOGGLE_LOGIN,
  CHECK_SESSION
} from '../types'

export const checkSession = (data) => {
  return async (dispatch) => {
    try {
      const response = await CheckSession(data)
      dispatch({ type: CHECK_SESSION, payload: response })
      return response.id
    } catch (error) {
      throw error
    }
  }
}

export const PostRegisterUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await RegisterUser(data)
      dispatch({ type: USER_REGISTER, payload: response.data })
      dispatch({ type: REGISTER_SUCCESS, payload: response.data })
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      dispatch({ type: REGISTER_FAIL, payload: message })
      dispatch({ type: SET_MESSAGE, payload: message })
    }
  }
}

export const PostLoginUser = (data) => {
  return async (dispatch) => {
    try {
      console.log('data', data)
      const response = await SignInUser(data)
      console.log('response', response)
      dispatch({ type: USER_LOGIN, payload: response })
      dispatch({ type: LOGIN_SUCCESS, payload: response })
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      dispatch({ type: LOGIN_FAIL, payload: message })
      dispatch({ type: SET_MESSAGE, payload: message })
    }
  }
}

export const ToggleAuthenticationModal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_MODAL_TOGGLE })
    } catch (error) {
      throw error
    }
  }
}

export const ToggleLoginModal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_LOGIN })
    } catch (error) {
      throw error
    }
  }
}

export const ToggleRegisterModal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_REGISTER })
    } catch (error) {
      throw error
    }
  }
}
