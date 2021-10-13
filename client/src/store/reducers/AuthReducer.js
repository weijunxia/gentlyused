import {
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_MODAL_TOGGLE
} from '../types'

const user = JSON.parse(localStorage.getItem('user'))

const iState = user
  ? { isLoggedIn: true, modalToggled: false, user }
  : { isLoggedIn: false, modalToggled: false, user: null }

const AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        modalToggled: true
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        modalToggled: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        modalToggled: false
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        modalToggled: true
      }
    case AUTH_MODAL_TOGGLE:
      return {
        ...state,
        modalToggled: true
      }
    default:
      return state
  }
}

export default AuthReducer
