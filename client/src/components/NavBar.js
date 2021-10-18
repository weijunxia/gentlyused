import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Favorite, AccountCircle } from '@mui/icons-material'
import AuthenticationForm from './AuthenticationForm'
import '../styles/navbar.css'

const mapStateToProps = ({ authenticationState, userState }) => {
  return { authenticationState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

function NavBar(props) {
  let authenticatedOptions
  if (props.authenticationState.isLoggedIn) {
    authenticatedOptions = (
      <div className="nav_bar_right">
        <div className="nav_bar_shop">
          <NavLink
            to="/shop"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Shop
          </NavLink>
        </div>
        <div className="nav_bar_sell">
          <NavLink
            to="/sell"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Sell
          </NavLink>
        </div>
        <div className="nav_bar_favorites">
          <NavLink
            to={`/${props.userState.individualUser.username}/favorites`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Favorite />
          </NavLink>
        </div>
        <div className="nav_bar_profile">
          <NavLink
            to={`/${props.userState.individualUser.username}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <AccountCircle />
          </NavLink>
        </div>
      </div>
    )
  }

  let unauthenticatedOptions
  if (!props.authenticationState.isLoggedIn) {
    unauthenticatedOptions = (
      <div className="nav_bar_right">
        <div className="nav_bar_shop">
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            to="/shop"
          >
            Shop
          </NavLink>
        </div>
        <div className="nav_bar_sell">
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            to="/sell"
          >
            Sell
          </NavLink>
        </div>
        <AuthenticationForm />
      </div>
    )
  }

  return (
    <div className="nav_bar">
      <div className="nav_bar_logo">
        <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/">
          <h3>Gently Used</h3>
        </NavLink>
      </div>
      <div className="nav_bar_center">
        <div className="nav_bar_search">
          <form className="search_form">
            <input type="text" className="search_input"></input>
          </form>
        </div>
      </div>
      {props.authenticationState.isLoggedIn
        ? authenticatedOptions
        : unauthenticatedOptions}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
