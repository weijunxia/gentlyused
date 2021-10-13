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
  SET_MESSAGE
} from '../types'

export const PostRegisterUser = (data) => {
  return async (dispatch) => {
    try {
      const response = RegisterUser(data)
      dispatch({ type: USER_REGISTER, payload: response.data })
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.message })
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
      const response = SignInUser(data)
      dispatch({ type: USER_LOGIN, payload: response.data })
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.message })
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
