import React from 'react'
import Login from './Login'
import Register from './Register'
import '../styles/navbar.css'

function NavBar(props) {
  let authenticatedOptions
  if (props.user) {
    authenticatedOptions = (
      <div className="nav_bar_right">
        <div className="nav_bar_shop">Shop</div>
        <div className="nav_bar_sell">Sell</div>
        <div className="nav_bar_favorites">❤️</div>
        <div className="nav_bar_profile"></div>
      </div>
    )
  }

  let unauthenticatedOptions
  if (!props.user) {
    unauthenticatedOptions = (
      <div className="nav_bar_right">
        <div className="nav_bar_shop">Shop</div>
        <div className="nav_bar_sell">Sell</div>
        <div className="nav_bar_login">
          <Login />
          Login
        </div>
        <div className="nav_bar_register">
          <Register />
          Register
        </div>
      </div>
    )
  }

  return (
    <div className="nav_bar">
      <div className="nav_bar_logo">
        <h3>Gently Used</h3>
      </div>
      <div className="nav_bar_center">
        <div className="nav_bar_search">
          <form className="search_form">
            <input type="text" className="search_input"></input>
          </form>
        </div>
      </div>
      {props.user ? authenticatedOptions : unauthenticatedOptions}
    </div>
  )
}

export default NavBar
