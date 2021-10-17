import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import '../styles/shopfeed.css'
import {
  LoadAllProductsAndFavorites,
  LoadProductById
} from '../store/actions/ProductActions'
import ProductCard from './ProductCard'

const mapStateToProps = ({ productState }) => {
  return { productState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductsFavorites: () => dispatch(LoadAllProductsAndFavorites()),
    loadProductById: (id) => dispatch(LoadProductById(id))
  }
}

function ShopFeed(props) {
  const dispatch = useDispatch()
  const loadAllProductsFavorites = async () => {
    await props.getAllProductsFavorites()
  }

  useEffect(() => {
    loadAllProductsFavorites()
  }, [dispatch])

  return (
    <div className="shop_feed">
      {props.productState.productsAndFavorites.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          {...product.product_favorite}
        />
      ))}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeed)
