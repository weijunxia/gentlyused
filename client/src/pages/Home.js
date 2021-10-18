import React from 'react'
import Banner from '../components/Banner'
import ShopFeed from '../components/ShopFeed'
function Home() {
  return (
    <div className="home">
      <div>
        <Banner />
        <h1>Feed</h1>
        <ShopFeed />
      </div>
    </div>
  )
}

export default Home
