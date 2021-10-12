import {
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../types'

const user = JSON.parse(localStorage.getItem('user'))

const iState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

const AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

export default AuthReducer
