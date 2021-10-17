import Modal from 'react-modal'
import { connect, useDispatch } from 'react-redux'
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
import { ToggleStripeContainer } from '../store/actions/StripeActions'
import StripeContainer from '../components/StripeContainer'
import Billing from '../components/Billing'
const mapStateToProps = ({
  authenticationState,
  productState,
  userState,
  orderState,
  stripeState
}) => {
  return {
    authenticationState,
    productState,
    userState,
    orderState,
    stripeState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: (data) => dispatch(CheckUserSession(data)),
    deleteUserProduct: (id) => dispatch(DeleteUserProduct(id)),
    toggleProductModal: () => dispatch(ToggleProductDeleteModal()),
    loadAllProducts: () => dispatch(LoadAllProducts()),
    loadUserProfile: (username) => dispatch(LoadUsernameProfile(username)),
    createOrder: (data) => dispatch(PostOrder(data)),
    toggleOrderModal: () => dispatch(ToggleOrderModal()),
    LoadProductById: (id) => dispatch(LoadProductById(id)),
    toggleStripeContainer: () => dispatch(ToggleStripeContainer())
  }
}

function ProductPage(props) {
  const dispatch = useDispatch()
  const toggleStripesContainer = async () => {
    await props.toggleStripeContainer()
  }
  const loadUser = async (data) => {
    await props.loadUserProfile(data)
  }
  const deleteUserProduct = async (id) => {
    await props.deleteUserProduct(id)
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
          pathname: `/product/update/${props.productState.individualProduct.id}`
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
          alt={`${props.productState.individualProduct.title}, ${props.productState.individualProduct.description}, size ${props.productState.individualProduct.size}, price $ ${props.productState.individualProduct.price}`}
        />
        <p>{props.productState.individualProduct.title}</p>
        <p>{props.productState.individualProduct.description}</p>
        <p>Size: {props.productState.individualProduct.size}</p>
        <p>Total: ${props.productState.individualProduct.price}</p>
        <button onClick={toggleStripesContainer}>Purchase</button>
      </div>
      <div className="purchase_item_wrapper_left">
        <div className="purchase_modal_order_form">
          {props.stripeState.stripeContainerToggle ? <Billing /> : <></>}
        </div>
      </div>
    </Modal>
  )
  const loadProductById = async (id) => {
    await props.LoadProductById(id)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    checkUserSession(token)
    // props.loadAllProducts()
    return props.location.pathname !== '/'
      ? loadProductById(props.match.params.id)
      : null
  }, [props.history.location.pathname])

  return (
    <div className="product_page">
      <img
        class="product_page_image"
        src="https://picsum.photos/200/300"
        alt={`${props.productState.individualProduct.title}, ${props.productState.individualProduct.description}, size ${props.productState.individualProduct.size}, price $ ${props.productState.individualProduct.price}`}
      />
      <p>{props.productState.individualProduct.title}</p>
      <p>{props.productState.individualProduct.description}</p>
      <p>{props.productState.individualProduct.size}</p>
      <p>${props.productState.individualProduct.price}</p>
      <p>{props.productState.individualProduct.sold}</p>
      <p>{props.productState.individualProduct.createdAt}</p>
      <div>
        {props.userState.individualUser.id ===
          props.productState.individualProduct.product_user_id &&
        props.authenticationState.isLoggedIn
          ? productOwnerControls
          : buyProduct}
      </div>
      {props.orderState.orderModalToggle ? orderModal : null}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
