import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { CheckUserSession } from '../store/actions/AuthActions'
import {
  UpdateUserProduct,
  DeleteUserProduct,
  LoadProductById,
  LoadAllProducts,
  ToggleProductDeleteModal
} from '../store/actions/ProductActions'
import '../styles/updatelisting.css'

const mapStateToProps = ({ authenticationState, productState }) => {
  return { authenticationState, productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CheckUserSession: (data) => dispatch(CheckUserSession(data)),
    deleteUserProduct: (id) => dispatch(DeleteUserProduct(id)),
    toggleProductModal: () => dispatch(ToggleProductDeleteModal()),
    loadAllProducts: () => dispatch(LoadAllProducts())
  }
}

function UpdateListing() {
  return (
    <div>
      <div></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListing)
