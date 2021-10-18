import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import '../styles/sellpagepreview.css'
function SellPreview() {
  const images = useSelector((state) => state.productState.productImages)
  const newProduct = useSelector(
    (state) => state.productState.recentlyAddedProduct
  )
  return (
    <div className="sell_page_preview">
      <div className="sell_page_product_card">
        <ProductCard {...newProduct} />
      </div>
      {images.map((image) => {
        return (
          <img
            className="sell_page_image_preview"
            src={image.file_name}
            alt={(image.image_product_id, image.user_id)}
          />
        )
      })}
    </div>
  )
}

export default SellPreview
