import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { checkSession } from '../store/actions/AuthActions'
import {
  UpdateUserProduct,
  DeleteUserProduct,
  LoadProductById,
  LoadAllProducts,
  ToggleProductDeleteModal
} from '../store/actions/ProductActions'
import { LoadUserProfile } from '../store/actions/UserActions'
import '../styles/productpage.css'

const mapStateToProps = ({ authenticationState, productState, userState }) => {
  return { authenticationState, productState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkSession: (data) => dispatch(checkSession(data)),
    deleteUserProduct: (id) => dispatch(DeleteUserProduct(id)),
    toggleProductModal: () => dispatch(ToggleProductDeleteModal()),
    loadAllProducts: () => dispatch(LoadAllProducts()),
    loadUserProfile: (id) => dispatch(LoadUserProfile(id))
  }
}

function ProductPage(props) {
  const location = useLocation()
  const locationState = location.state
  let userId

  const deleteUserProduct = async () => {
    props.deleteUserProduct(locationState.id)
    props.toggleProductModal()
  }
  let productOwnerControls = (
    <div>
      <NavLink
        to={{
          pathname: `/product/update/${locationState.id}`,
          state: { ...locationState }
        }}
      >
        <button>Update Listing</button>
      </NavLink>
      <button onClick={deleteUserProduct}>Delete Listing</button>
    </div>
  )
  const checkUserSession = async (token) => {
    const sessionStatus = await props.checkSession(token)
    userId = sessionStatus
    console.log(userId)
    console.log(locationState.product_user_id)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    checkUserSession(token)
    props.loadAllProducts()
  }, [])

  return (
    <div className="product_page">
      <div>{locationState.title}</div>
      <div>{locationState.description}</div>
      <div>{locationState.size}</div>
      <div>${locationState.price}</div>
      <div>{locationState.sold}</div>
      <div>{locationState.createdAt}</div>
      <div>
        {userId === locationState.product_user_id &&
        props.authenticationState.isLoggedIn
          ? productOwnerControls
          : null}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
