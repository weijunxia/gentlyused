import React from 'react'
import { connect } from 'react-redux'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
// import { NavLink } from 'react-router-dom'
// import {
//   LoadAllProducts,
//   LoadProductById,
//   LoadProductSearch,
//   UpdateUserProduct,
//   DeleteUserProduct
// } from '../store/actions/ProductActions'
import '../styles/product.css'

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
    <div className="product_card">
      <img
        src="https://picsum.photos/200/300"
        alt={`${props.title} ${props.description}`}
      />
      <div>{props.title}</div>
      <div>{props.size}</div>
      <div>{props.description}</div>
      <div>{props.price}</div>
      <div>{props.updatedAt}</div>
      <FavoriteBorder />
    </div>
  )
}
// connect(mapStateToProps, mapDispatchToProps)
export default ProductCard
