import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  LoadAllProducts,
  LoadProductById,
  LoadProductSearch,
  UpdateUserProduct,
  DeleteUserProduct
} from '../store/actions/'
import '../styles/product.css'

const mapStateToProps = ({ productState }) => {
  return { productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(LoadAllProducts())
  }
}

function Product() {
  return (
    <div className="product">
      <div></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
