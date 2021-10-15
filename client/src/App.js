import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './styles/App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ShopFeed from './components/ShopFeed'
import Sell from './pages/Sell'
import ProductPage from './pages/ProductPage'
import UpdateListing from './pages/UpdateListing'
import Profile from './pages/Profile'
import UserFavorites from './components/UserFavorites'

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={ShopFeed} />
          <Route exact path="/sell" component={Sell} />
          <Route exact path="/product/update/:id" component={UpdateListing} />
          <Route exact path="/shop/product/:id" component={ProductPage} />
          <Route exact path="/:username/favorites" component={UserFavorites} />
          <Route exact path="/:username" component={Profile} />
        </Switch>
      </div>
    </div>
  )
}

export default App
