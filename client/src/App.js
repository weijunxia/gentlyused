import React, { useState, useEffect } from 'react'
import './styles/App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
// import ShopFeed from './components/ShopFeed'
function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <Banner />
      </div>
    </div>
  )
}

export default App
