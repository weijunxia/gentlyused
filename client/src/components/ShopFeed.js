import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../styles/shopfeed.css'
import {
  LoadAllProducts,
  LoadProductSearch
} from '../store/actions/ProductActions'
import ProductCard from './ProductCard'

const mapStateToProps = ({ productState }) => {
  return { productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(LoadAllProducts())
  }
}

function ShopFeed(props) {
  const dispatch = useDispatch()
  const loadAllProducts = async () => {
    await props.getAllProducts()
  }

  useEffect(() => {
    loadAllProducts()
  }, [dispatch])

  console.log(props.productState.products)
  return (
    <div className="shop_feed">
      {props.productState.products.map((product) => (
        <NavLink
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ProductCard key={product.id} {...product} />
        </NavLink>
      ))}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeed)
