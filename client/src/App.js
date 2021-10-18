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
import { GET_ALL_IMAGES } from './store/types'
import { GetImages } from './store/actions/ImageActions'
import { GetAllProductsImages } from './store/actions/ProductActions'
// import { CheckUserSession } from './store/actions/AuthActions'

// const mapStateToProps = ({
//   authenticationState,
//   imageState,
//   productState,
//   userState
// }) => {
//   return { authenticationState, imageState, productState, userState }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAllImages: () => dispatch(GetImages()),
//     getAllProductsImages: (id) => dispatch(GetAllProductsImages(id))
//   }
// }

function App(props) {
  // const dispatch = useDispatch()

  // let token = localStorage.getItem('token')
  // const checkUsersSession = async (param) => {
  //   await props.checkUserSession(param)
  // }
  // const getDbImages = async (id) => {
  //   await props.getAllProductsImages(id)
  // }
  // useEffect(() => {

  // }, [dispatch])
  return (
    <div className="App">
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
  )
}
export default App
// export default connect(mapStateToProps, mapDispatchToProps)(App)
