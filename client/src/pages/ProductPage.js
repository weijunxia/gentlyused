import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/productpage.css'

function ProductPage(props) {
  const location = useLocation()
  const locationState = location.state
  return (
    <div className="product_page">
      <div>{locationState.title}</div>
      <div>{locationState.description}</div>
      <div>{locationState.size}</div>
      <div>${locationState.price}</div>
      <div>{locationState.sold}</div>
      <div>{locationState.createdAt}</div>
    </div>
  )
}

export default ProductPage
