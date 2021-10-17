import React, { useState, useEffect } from 'react'
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
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const loadAllProductsFavorites = async () => {
    await props.getAllProductsFavorites()
  }
  const buttonCounter = () => {
    if (count > 0 && count < 6) {
      setCount(count + 1)
    }
    if (count === 6) {
      setCount(0)
    }
  }
  useEffect(() => {
    loadAllProductsFavorites()
  }, [dispatch])

  return (
    <div className="shop_feed">
      <button onClick={buttonCounter}>+</button>
      {count}
      {props.productState.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeed)
