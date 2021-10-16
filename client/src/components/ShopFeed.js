import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../styles/shopfeed.css'
import {
  LoadAllProducts,
  LoadProductById
} from '../store/actions/ProductActions'
import ProductCard from './ProductCard'

const mapStateToProps = ({ productState }) => {
  return { productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(LoadAllProducts()),
    loadProductById: (id) => dispatch(LoadProductById(id))
  }
}

function ShopFeed(props) {
  const dispatch = useDispatch()
  const loadAllProducts = async () => {
    await props.getAllProducts()
  }
  const loadProductsById = async () => {
    props.productState.products.forEach(
      async (product) => await props.loadProductById(product.id)
    )
  }
  useEffect(() => {
    loadAllProducts()
    loadProductsById()
  }, [dispatch])

  return (
    <div className="shop_feed">
      {props.productState.products.map((product) => (
        <ProductCard key={product.id} />
      ))}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeed)
