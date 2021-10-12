const {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FAVORITES,
  GET_PRODUCT_SEARCH,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} = require('../types')

const iState = {
  products: [],
  individualProduct: [],
  productSearch: [],
  productsLoading: ''
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload }
    case GET_PRODUCT_BY_ID:
      return { ...state, individualProduct: action.payload }
    case GET_PRODUCT_SEARCH:
      return { ...state, productSearch: action.payload }
    case UPDATE_PRODUCT:
      return { ...state, individualProduct: action.payload }
    case DELETE_PRODUCT:
      return { ...state, products: action.payload }
    default:
      return { ...state }
  }
}

export default ProductReducer
