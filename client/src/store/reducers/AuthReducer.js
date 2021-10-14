import {
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_MODAL_TOGGLE,
  TOGGLE_LOGIN,
  TOGGLE_REGISTER
} from '../types'

const iState = {
  user: JSON.parse(localStorage.getItem('user')),
  isLoggedIn: false,
  modalToggled: false,
  registration: false,
  login: false
}

const AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        registration: false,
        login: true,
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
        modalToggled: !state.modalToggled
      }
    case TOGGLE_LOGIN:
      if (state.login === false) {
        return {
          ...state,
          login: true,
          modalToggled: true,
          registration: false
        }
      } else {
        return {
          ...state,
          login: false,
          modalToggled: false,
          registration: false
        }
      }
    case TOGGLE_REGISTER:
      if (state.registration === false) {
        return {
          ...state,
          registration: true,
          modalToggled: true,
          login: false
        }
      } else {
        return {
          ...state,
          registration: false,
          modalToggled: false,
          login: false
        }
      }
    default:
      return state
  }
}

export default AuthReducer
