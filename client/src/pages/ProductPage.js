import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { CheckUserSession } from '../store/actions/AuthActions'
import {
  UpdateUserProduct,
  DeleteUserProduct,
  LoadProductById,
  LoadAllProducts,
  ToggleProductDeleteModal
} from '../store/actions/ProductActions'
import { LoadUsernameProfile } from '../store/actions/UserActions'
import { PostOrder } from '../store/actions/OrderActions'
import '../styles/productpage.css'

const mapStateToProps = ({
  authenticationState,
  productState,
  userState,
  orderState
}) => {
  return { authenticationState, productState, userState, orderState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    deleteUserProduct: (id) => dispatch(DeleteUserProduct(id)),
    toggleProductModal: () => dispatch(ToggleProductDeleteModal()),
    loadAllProducts: () => dispatch(LoadAllProducts()),
    loadUserProfile: (username) => dispatch(LoadUsernameProfile(username)),
    createOrder: (data) => dispatch(PostOrder(data))
  }
}

function ProductPage(props) {
  const location = useLocation()
  const locationState = location.state

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
  let buyProduct = <div></div>
  const checkUserSession = async (token) => {
    const sessionStatus = await props.checkUserSession(token)
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
        {props.userState.individualUser.id === locationState.product_user_id &&
        props.authenticationState.isLoggedIn
          ? productOwnerControls
          : null}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
