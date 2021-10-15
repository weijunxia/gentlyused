import Modal from 'react-modal'
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
import { PostOrder, ToggleOrderModal } from '../store/actions/OrderActions'
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
    createOrder: (data) => dispatch(PostOrder(data)),
    toggleOrderModal: () => dispatch(ToggleOrderModal())
  }
}

function ProductPage(props) {
  const location = useLocation()
  const locationState = location.state
  const loadUser = async (data) => {
    await props.loadUserProfile(data)
  }
  const deleteUserProduct = async () => {
    await props.deleteUserProduct(locationState.id)
    await props.toggleProductModal()
  }
  const postOrder = async (data) => {
    await props.createOrder(data)
  }
  const checkUserSession = async (token) => {
    const sessionStatus = await props.checkUserSession(token)
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
  let buyProduct = (
    <div className="product_page_buy">
      <button
        className="product_page_buy_button"
        onClick={props.toggleOrderModal}
      >
        Purchase
      </button>
    </div>
  )
  const orderModal = (
    <Modal isOpen={true} className="purchase_modal">
      <button className="purchase_modal_exit" onClick={props.toggleOrderModal}>
        X
      </button>
      <div className="purchase_item_wrapper_right">
        <img
          class="order_modal_image"
          src="https://picsum.photos/200/300"
          alt={`${locationState.title}, ${locationState.description}, size ${locationState.size}, price $ ${locationState.price}`}
        />
        <p>{locationState.title}</p>
        <p>{locationState.description}</p>
        <p>Size: {locationState.size}</p>
        <p>Total: ${locationState.price}</p>
        <button>Purchase</button>
      </div>
      <div className="purchase_item_wrapper_left">
        <div className="purchase_modal_order_form"></div>
      </div>
    </Modal>
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    checkUserSession(token)
    props.loadAllProducts()
  }, [])

  return (
    <div className="product_page">
      <img
        class="product_page_image"
        src="https://picsum.photos/200/300"
        alt={`${locationState.title}, ${locationState.description}, size ${locationState.size}, price $ ${locationState.price}`}
      />
      <p>{locationState.title}</p>
      <p>{locationState.description}</p>
      <p>{locationState.size}</p>
      <p>${locationState.price}</p>
      <p>{locationState.sold}</p>
      <p>{locationState.createdAt}</p>
      <div>
        {props.userState.individualUser.id === locationState.product_user_id &&
        props.authenticationState.isLoggedIn
          ? productOwnerControls
          : buyProduct}
      </div>
      {props.orderState.orderModalToggle ? orderModal : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
