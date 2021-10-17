const {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FAVORITES,
  GET_ALL_PRODUCTS_AND_FAVORITES,
  CREATE_PRODUCT,
  GET_PRODUCT_SEARCH,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  TOGGLE_PRODUCT_DELETE_MODAL
} = require('../types')

const iState = {
  products: [],
  productsAndFavorites: [],
  individualProduct: [],
  productSearch: [],
  productsLoading: '',
  productDeleteModal: false
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload }

    case GET_ALL_PRODUCTS_AND_FAVORITES:
      return { ...state, productsAndFavorites: action.payload }
    case GET_PRODUCT_BY_ID:
      return { ...state, individualProduct: action.payload }
    case GET_PRODUCT_SEARCH:
      return { ...state, productSearch: action.payload }
    case CREATE_PRODUCT:
      return { ...state, products: action.payload }
    case UPDATE_PRODUCT:
      return {
        ...state,
        individualProduct: action.payload,
        products: action.payload
      }
    case GET_PRODUCT_FAVORITES:
      return { ...state, individualProduct: action.payload }
    case DELETE_PRODUCT:
      return { ...state, products: action.payload }
    case TOGGLE_PRODUCT_DELETE_MODAL:
      return { ...state, productDeleteModal: !state.productDeleteModal }
    default:
      return { ...state }
  }
}

export default ProductReducer
