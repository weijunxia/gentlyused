import React from 'react'
import { useHistory } from 'react-router'
import '../styles/banner.css'

function Banner() {
  const history = useHistory()
  return (
    <div className="banner">
      <div className="banner_info">
        <h1>Reduce Reuse Recycle</h1>
        <button onClick={() => history.push('/shop')} variant="outlined">
          Browse Our Newest Items!
        </button>
      </div>
    </div>
  )
}

export default Banner
