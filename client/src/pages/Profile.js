import React from 'react'
import '../styles/profile.css'
import {
  PostRegisterUser,
  PostLoginUser,
  ToggleAuthenticationModal,
  ToggleLoginModal,
  ToggleRegisterModal,
  CheckUserSession
} from '../store/actions/AuthActions'
import { LoadUserEmailProfile } from '../store/actions/UserActions'
import ProductCard from '../components/ProductCard'

const mapStateToProps = ({ authenticationState, userState }) => {
  return { authenticationState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRegistration: (data) => dispatch(PostRegisterUser(data)),
    createLogin: (data) => dispatch(PostLoginUser(data)),
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    toggleModal: () => dispatch(ToggleAuthenticationModal())
  }
}

function Profile(profile) {
  return (
    <div className="profile">
      <div></div>
    </div>
  )
}

export default Profile
