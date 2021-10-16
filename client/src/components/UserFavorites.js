import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { CheckUserSession } from '../store/actions/AuthActions'
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
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    getUserFavorites: (username) => dispatch(LoadUserFavorites(username)),
    loadUserProfile: (data) => dispatch(LoadUsernameProfile(data))
  }
}
function UserFavorites(props) {
  const token = localStorage.getItem('token')
  const loadUserFavorites = async (username) => {
    username = props.userState.individualUser.username
    await props.getUserFavorites(username)
  }

  let usersFavorites = (
    <div className="user_favorites_cards">
      <h1>Your Favorites</h1>
      {props.userState.individualUserFavorites.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )

  useEffect(() => {
    props.checkUserSession(token)
    loadUserFavorites()
  }, [])

  return (
    <div className="user_favorites_page">
      {props.userState.individualUserFavorites ? usersFavorites : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFavorites)
