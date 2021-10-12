import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import ProductReducer from './reducers/ProductReducer'
import UserReducer from './reducers/UserReducer'

const store = createStore(
  combineReducers({
    productState: ProductReducer,
    userState: UserReducer,
    authenticationState: AuthReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
