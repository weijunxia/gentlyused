import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Modal from 'react-modal'
import { PostRegisterUser, PostLoginUser } from '../store/actions/AuthActions'
import '../styles/authenticationform.css'

const mapStateToProps = ({ authenticationState }) => {
  return { authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRegistration: () => dispatch(PostRegisterUser()),
    createLogin: () => dispatch(PostLoginUser())
  }
}

function AuthenticationForm(props) {
  const [registrationForm, setRegistrationForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  function handleModalToggle(e) {
    console.log(props.authenticationState.modalToggled)
    e.preventDefault()
    props.authenticationState.modalToggled =
      !props.authenticationState.modalToggled
  }
  function handleFormChange(e) {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value
    })
  }
  function handleUserRegistration(e) {
    e.preventDefault()
    props.createRegistration(registrationForm)
  }
  return (
    <div className="register_login">
      <div className="register">
        <button onClick={(e) => handleModalToggle(e)}>Register</button>
      </div>
      <Modal
        isOpen={true}
        className="registration_modal"
        onRequestClose={(e) => handleModalToggle(e)}
      >
        <button className="modal_exit" onClick={(e) => handleModalToggle(e)}>
          X
        </button>
        <h2>Register</h2>
        <form
          className="registration_modal_form"
          onSubmit={(e) => handleUserRegistration(e)}
        >
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => handleFormChange(e)}
          />
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => handleFormChange(e)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="pasword"
            onChange={(e) => handleFormChange(e)}
          />
          <button>Sign Up</button>
        </form>
      </Modal>
      <div className="login">Login</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationForm)
