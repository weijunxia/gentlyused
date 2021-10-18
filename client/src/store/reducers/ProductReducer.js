const {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FAVORITES,
  GET_ALL_PRODUCTS_AND_FAVORITES,
  CREATE_PRODUCT,
  GET_PRODUCT_SEARCH,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  TOGGLE_PRODUCT_DELETE_MODAL,
  CLEAR_RECENTLY_ADDED,
  GET_IMAGE_BY_PRODUCT_ID
} = require('../types')

const iState = {
  products: [],
  productsAndFavorites: [],
  individualProduct: [],
  recentlyAddedProduct: [],
  productSearch: [],
  productsLoading: '',
  productDeleteModal: false,
  productImages: []
}

const ProductReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      console.log(action.payload)
      return { ...state, products: action.payload }
    case GET_ALL_PRODUCTS_AND_FAVORITES:
      return { ...state, productsAndFavorites: action.payload }
    case GET_PRODUCT_BY_ID:
      return { ...state, individualProduct: action.payload }
    case GET_PRODUCT_SEARCH:
      return { ...state, productSearch: action.payload }
    case CREATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
        recentlyAddedProduct: action.payload
      }
    case GET_IMAGE_BY_PRODUCT_ID:
      return { ...state, productImages: action.payload }
    case CLEAR_RECENTLY_ADDED:
      return {
        ...state,
        recentlyAddedProduct: []
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
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
