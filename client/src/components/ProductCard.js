import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
// import { NavLink } from 'react-router-dom'
// import {
//   LoadAllProducts,
//   LoadProductById,
//   LoadProductSearch,
//   UpdateUserProduct,
//   DeleteUserProduct
// } from '../store/actions/ProductActions'
import '../styles/productcard.css'
import ProductPage from '../pages/ProductPage'

// const mapStateToProps = ({ productState }) => {
//   return { productState }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchProducts: () => dispatch(LoadAllProducts())
//   }
// }

function ProductCard(props) {
  return (
    <NavLink
      to={{ pathname: `/shop/product/${props.id}`, state: { ...props } }}
    >
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

        <FavoriteBorder />
      </div>
    </NavLink>
  )
}
// connect(mapStateToProps, mapDispatchToProps)
export default ProductCard
