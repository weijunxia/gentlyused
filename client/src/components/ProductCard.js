import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  LoadAllProducts,
  LoadProductById,
  LoadProductSearch,
  UpdateUserProduct,
  DeleteUserProduct
} from '../store/actions/ProductActions'
import { CheckUserSession } from '../store/actions/AuthActions'
import { LoadUserFavorites } from '../store/actions/UserActions'
import { AddFavorite, RemoveFavorite } from '../store/actions/FavoriteActions'
import '../styles/productcard.css'
import { FavoriteBorder, Favorite } from '@mui/icons-material'

const mapStateToProps = ({ productState, userState }) => {
  return { productState, userState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(LoadAllProducts()),
    loadUserFavorites: (username) => dispatch(LoadUserFavorites(username)),
    addFavorite: (userId, productId) => dispatch(AddFavorite(userId, productId))
  }
}

function ProductCard(props) {
  const handleFavoriteToggle = async (username, userId, productId) => {
    userId = props.userState.individualUser.username
    productId = props.id
    username = props.userState.individualUser.username
    // await props.loadUserFavorites(username)
    await props.addFavorite(userId, productId)
  }

  return (
    <div className="product_card">
      <NavLink
        to={{ pathname: `/shop/product/${props.id}`, state: { ...props } }}
      >
        <img
          className="product_card_image"
          src="https://picsum.photos/200/300"
          alt={`${props.title} ${props.description}`}
        />

        <p className="product_card_date">
          <span>Posted </span>
          {props.createdAt}
        </p>
        <p className="product_card_title">{props.title}</p>
        <p className="product_card_size">{props.size}</p>
        <p className="product_card_description">{props.description}</p>
        <p className="product_card_price">${props.price}</p>
      </NavLink>
      <FavoriteBorder onClick={handleFavoriteToggle} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
