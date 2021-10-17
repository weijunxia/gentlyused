import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
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
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const loadAllProducts = async () => {
    await props.getAllProducts()
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
    // loadAllProducts()
    props.loadProductById(count)
  }, [count])

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
