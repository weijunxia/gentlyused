import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import './styles/App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ShopFeed from './components/ShopFeed'
import Sell from './pages/Sell'
import ProductPage from './pages/ProductPage'
import UpdateListing from './pages/UpdateListing'
import Profile from './pages/Profile'
import UserFavorites from './components/UserFavorites'
import { connect, useDispatch } from 'react-redux'
import { CheckUserSession } from './store/actions/AuthActions'

const mapStateToProps = ({ authenticationState }) => {
  return { authenticationState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: (token) => dispatch(CheckUserSession(token))
  }
}

function App(props) {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')
  const checkUsersSession = async (param) => {
    await props.checkUserSession(param)
  }
  useEffect(() => {
    checkUsersSession(token)
  }, [dispatch])
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
