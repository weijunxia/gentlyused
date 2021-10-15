import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  PostRegisterUser,
  PostLoginUser,
  ToggleAuthenticationModal,
  ToggleLoginModal,
  ToggleRegisterModal,
  CheckUserSession
} from '../store/actions/AuthActions'
import {
  LoadUsernameProfile,
  LoadUserFavorites
} from '../store/actions/UserActions'
import ProductCard from './ProductCard'

const mapStateToProps = ({ authenticationState, userState }) => {
  return { authenticationState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRegistration: (data) => dispatch(PostRegisterUser(data)),
    createLogin: (data) => dispatch(PostLoginUser(data)),
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    toggleModal: () => dispatch(ToggleAuthenticationModal()),
    getUserFavorites: (data) => dispatch(LoadUserFavorites(data)),
    loadUserProfile: (data) => dispatch(LoadUsernameProfile(data))
  }
}
function UserFavorites(props) {
  const token = localStorage.getItem('token')

  useEffect(() => {
    props.checkUserSession(token)
  }, [])

  return (
    <div>
      <div></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFavorites)
