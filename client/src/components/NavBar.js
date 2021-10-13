import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AuthenticationForm from './AuthenticationForm'
import '../styles/navbar.css'

const mapStateToProps = ({ authenticationState }) => {
  return { authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

function NavBar(props) {
  let authenticatedOptions
  if (props.user) {
    authenticatedOptions = (
      <div className="nav_bar_right">
        <div className="nav_bar_shop">Shop</div>
        <div className="nav_bar_sell">
          <NavLink to="/sell">Sell</NavLink>
        </div>
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
        <div className="nav_bar_sell">
          <NavLink to="/sell">Sell</NavLink>
        </div>
        <AuthenticationForm />
      </div>
    )
  }

  return (
    <div className="nav_bar">
      <div className="nav_bar_logo">
        <NavLink to="/">
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
      {props.user ? authenticatedOptions : unauthenticatedOptions}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
