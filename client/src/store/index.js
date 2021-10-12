import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import ProductReducer from './reducers/ProductReducer'

const store = createStore(
  combineReducers({
    productState: ProductReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
