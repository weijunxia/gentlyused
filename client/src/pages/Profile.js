import React, { useEffect } from 'react'
import { CheckUserSession } from '../store/actions/AuthActions'
import {
  LoadUsernameProfile,
  LoadUserFavorites
} from '../store/actions/UserActions'
import { connect } from 'react-redux'
import { LoadUserProfileProducts } from '../store/actions/UserActions'
import ProductCard from '../components/ProductCard'
import '../styles/profile.css'

const mapStateToProps = ({ authenticationState, userState }) => {
  return { authenticationState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    loadUserProducts: (username) => dispatch(LoadUserProfileProducts(username))
  }
}

function Profile(props) {
  const token = localStorage.getItem('token')
  const getUsersProducts = async (username) => {
    username = props.userState.individualUser.username
    await props.loadUserProducts(username)
  }
  let usersProducts = (
    <div className="users_products_cards">
      <h1>Your Favorites</h1>
      {props.userState.individualUserProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
  useEffect(() => {
    props.checkUserSession(token)
    getUsersProducts()
  }, [])
  return (
    <div className="profile">
      {props.userState.individualUserProducts ? usersProducts : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
