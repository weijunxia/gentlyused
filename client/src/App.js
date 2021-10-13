import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './styles/App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Home from './pages/Home'
import ShopFeed from './components/ShopFeed'
import Sell from './pages/Sell'
// import ShopFeed from './components/ShopFeed'
function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <Banner />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={ShopFeed} />
          <Route exact path="/sell" component={Sell} />
        </Switch>
      </div>
    </div>
  )
}

export default App
