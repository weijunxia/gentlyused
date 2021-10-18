import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
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
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import '../styles/productcard.css'

const mapStateToProps = ({ productState, userState, favoriteState }) => {
  return { productState, userState, favoriteState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(LoadAllProducts()),
    addToFavorite: ({ favorite_user_id, favorite_product_id }) =>
      dispatch(AddFavorite({ favorite_user_id, favorite_product_id })),
    removeFavorite: (id) => dispatch(RemoveFavorite(id)),
    loadProductById: (id) => dispatch(LoadProductById(id)),
    loadUserFavorites: (username) => dispatch(LoadUserFavorites(username))
  }
}

function ProductCard(props) {
  const dispatch = useDispatch()
  const addFavorite = async (userId, productId) => {
    userId = props.userState.individualUser.id
    productId = props.id
    await props.addToFavorite({
      favorite_user_id: userId,
      favorite_product_id: productId
    })
  }
  const removeFromFavorite = async (userId, productId) => {
    userId = props.userState.individualUser.id
    productId = props.id
  }

  useEffect(() => {}, [dispatch])

  return (
    <div className="product_card">
      <NavLink
        to={{ pathname: `/shop/product/${props.id}` }}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <img
          className="product_card_image"
          src="https://picsum.photos/200/300"
          alt={`${props.title} ${props.description}`}
        />

        <p className="product_card_date">
          <span>Posted {props.createdAt}</span>
        </p>
        <div className="product_card_title_size">
          <span className="product_card_title">{props.title}</span>
          <span className="product_card_size">{props.size}</span>
        </div>
        <div className="product_card_info">
          <span className="product_card_description">{props.description}</span>
          <span className="product_card_price">${props.price}</span>
        </div>
      </NavLink>
      <div className="product_card_favorite">
        <FavoriteBorder onClick={addFavorite} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
