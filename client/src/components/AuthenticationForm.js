import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import {
  PostRegisterUser,
  PostLoginUser,
  ToggleAuthenticationModal,
  ToggleLoginModal,
  ToggleRegisterModal,
  CheckUserSession
} from '../store/actions/AuthActions'
import { LoadUserEmailProfile } from '../store/actions/UserActions'
import '../styles/authenticationform.css'

const mapStateToProps = ({ authenticationState, userState }) => {
  return { authenticationState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRegistration: (data) => dispatch(PostRegisterUser(data)),
    createLogin: (data) => dispatch(PostLoginUser(data)),
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    toggleModal: () => dispatch(ToggleAuthenticationModal()),
    toggleLogin: () => dispatch(ToggleLoginModal()),
    toggleRegister: () => dispatch(ToggleRegisterModal()),
    loadUserProfile: (email) => dispatch(LoadUserEmailProfile(email))
  }
}

function AuthenticationForm(props) {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  let registrationFormData = {}
  let loginFormData = {}

  function handleModalToggle() {
    props.toggleModal()
  }

  function handleRegisterToggle() {
    props.toggleRegister()
  }

  function handleLoginToggle() {
    props.toggleLogin()
  }

  const handleUserRegistration = async (values) => {
    await sleep(300)
    await props.createRegistration(values)
  }

  const handleUserLogin = async (values) => {
    await sleep(300)
    await props.createLogin(values)
    await props.loadUserProfile(values.email)
  }
  Modal.setAppElement('body')
  const registrationModal = (
    <Form
      onSubmit={handleUserRegistration}
      handleUserRegistration={handleUserRegistration}
      initialValues={registrationFormData}
      validate={(values) => {
        const errors = {}
        if (!values.username) {
          errors.username = 'Username Required'
        }
        if (!values.email) {
          errors.email = 'Email Required'
        }
        if (!values.password) {
          errors.password = 'Password Required'
        }
        return errors
      }}
      render={({ submitError, handleUserRegistration, submitting, values }) => (
        <Modal isOpen={true} className="auth_modal">
          <h3>Sign Up!</h3>
          <form
            className="auth_modal_form"
            onSubmit={(e) => {
              e.preventDefault()
              handleUserRegistration(values)
            }}
          >
            <Field name="username">
              {({ input, meta }) => (
                <div className="auth_modal_field">
                  <label className="auth_modal_label">Username</label>
                  <input {...input} type="text" placeholder="Username" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input, meta }) => (
                <div className="auth_modal_field">
                  <label className="auth_modal_label">Email</label>
                  <input {...input} type="text" placeholder="email" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div className="auth_modal_field">
                  <label className="auth_modal_label">Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {submitError && <div className="error">{submitError}</div>}
            <div className="registration_buttons">
              <button className="auth_modal_buttons" disabled={submitting}>
                Register
              </button>
              <button className="modal_exit" onClick={handleRegisterToggle}>
                X
              </button>
            </div>
          </form>
        </Modal>
      )}
    />
  )
  const loginModal = (
    <Form
      onSubmit={handleUserLogin}
      handleUserLogin={handleUserLogin}
      initialValues={loginFormData}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Email Required'
        }
        if (!values.password) {
          errors.password = 'Password Required'
        }
        return errors
      }}
      render={({ submitError, handleUserLogin, submitting, values }) => (
        <Modal isOpen={true} className="auth_modal">
          <h3>Welcome Back!</h3>
          <form
            className="auth_modal_form"
            onSubmit={(e) => {
              e.preventDefault()
              handleUserLogin(values)
            }}
          >
            <Field name="email">
              {({ input, meta }) => (
                <div className="auth_modal_field">
                  <label className="auth_modal_label">Email</label>
                  <input {...input} type="text" placeholder="email" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div className="auth_modal_field">
                  <label className="auth_modal_label">Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {submitError && <div className="error">{submitError}</div>}
            <div className="registration_buttons">
              <button className="auth_modal_buttons" disabled={submitting}>
                Login
              </button>
              <button className="modal_exit" onClick={handleLoginToggle}>
                X
              </button>
            </div>
          </form>
        </Modal>
      )}
    />
  )

  return (
    <div className="register_login">
      <div className="register_nav_bar" onClick={handleRegisterToggle}>
        Register
      </div>
      {props.authenticationState.modalToggled &&
      props.authenticationState.registration
        ? registrationModal
        : null}
      <div className="login_nav_bar" onClick={handleLoginToggle}>
        Login
      </div>
      {props.authenticationState.modalToggled && props.authenticationState.login
        ? loginModal
        : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationForm)
