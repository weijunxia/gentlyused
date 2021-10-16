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
import '../styles/productcard.css'
import { FavoriteBorder, Favorite } from '@mui/icons-material'

const mapStateToProps = ({ productState, userState, favoriteState }) => {
  return { productState, userState, favoriteState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(LoadAllProducts()),
    loadUserFavorites: (username) => dispatch(LoadUserFavorites(username)),
    addToFavorite: ({ userId, productId }) =>
      dispatch(AddFavorite({ userId, productId })),
    removeFavorite: (id) => dispatch(RemoveFavorite(id)),
    loadProductById: (id) => dispatch(LoadProductById(id))
  }
}

function ProductCard(props) {
  const dispatch = useDispatch()

  // const loadProductsById = async (id) => {
  //   await props.productState.products.forEach(
  //     async (product) => await props.loadProductById(product.id)
  //   )
  // }
  const addFavorite = async (userId, productId) => {
    await props.addToFavorite({
      favorite_user_id: userId,
      favorite_product_id: productId
    })
  }
  const loadUserFavorites = async (username) => {
    username = props.userState.individualUser.username
    await props.loadUserFavorites(username)
  }

  useEffect(() => {
    loadUserFavorites()
    // loadProductsById()
  }, [dispatch])

  return (
    <div className="product_card">
      <NavLink to={{ pathname: `/shop/product/${props.id}` }}>
        <div className="product_card">
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
        </div>
      </NavLink>
      <FavoriteBorder onClick={addFavorite} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
