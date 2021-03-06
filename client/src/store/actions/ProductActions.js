import {
  GetAllProducts,
  GetAllProductsAndFavorites,
  GetProductById,
  GetProductSearch,
  CreateProduct,
  UpdateProduct,
  GetFavoritesForProduct,
  DeleteProduct,
  GetAllProductImages
} from '../../services/ProductServices'

const {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FAVORITES,
  GET_PRODUCT_SEARCH,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  TOGGLE_PRODUCT_DELETE_MODAL,
  GET_ALL_PRODUCTS_AND_FAVORITES,
  CLEAR_RECENTLY_ADDED,
  GET_ALL_PRODUCT_IMAGES
} = require('../types')

export const ToggleProductDeleteModal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_PRODUCT_DELETE_MODAL })
    } catch (error) {
      throw error
    }
  }
}
export const GetAllProductsImages = (id) => {
  return async (dispatch) => {
    try {
      const productsImages = await GetAllProductImages(id)
      dispatch({ type: GET_ALL_PRODUCT_IMAGES, payload: productsImages })
    } catch (error) {
      throw error
    }
  }
}

export const GetAProductsFavorites = (product_id) => {
  return async (dispatch) => {
    try {
      const usersFavorites = await GetFavoritesForProduct(product_id)
      dispatch({ type: GET_PRODUCT_FAVORITES, payload: usersFavorites })
    } catch (error) {
      throw error
    }
  }
}
export const LoadAllProducts = () => {
  return async (dispatch) => {
    try {
      const products = await GetAllProducts()
      dispatch({ type: GET_ALL_PRODUCTS, payload: products })
    } catch (error) {
      throw error
    }
  }
}
export const LoadAllProductsAndFavorites = () => {
  return async (dispatch) => {
    try {
      const productsAndFavorites = await GetAllProductsAndFavorites()
      dispatch({
        type: GET_ALL_PRODUCTS_AND_FAVORITES,
        payload: productsAndFavorites
      })
    } catch (error) {
      throw error
    }
  }
}
export const LoadProductById = (id) => {
  return async (dispatch) => {
    try {
      const product = await GetProductById(id)
      dispatch({ type: GET_PRODUCT_BY_ID, payload: product })
    } catch (error) {
      throw error
    }
  }
}

export const LoadProductSearch = (query) => {
  return async (dispatch) => {
    try {
      const searchQuery = await GetProductSearch(query)
      dispatch({ type: GET_PRODUCT_SEARCH, payload: searchQuery })
    } catch (error) {
      throw error
    }
  }
}

export const UpdateUserProduct = (id, data) => {
  return async (dispatch) => {
    try {
      const updatedProduct = await UpdateProduct(id, data)
      dispatch({ type: UPDATE_PRODUCT, payload: updatedProduct.data })
    } catch (error) {
      throw error
    }
  }
}

export const DeleteUserProduct = (id) => {
  return async (dispatch) => {
    try {
      const deletedProduct = await DeleteProduct(id)
      dispatch({ type: DELETE_PRODUCT, payload: deletedProduct })
    } catch (error) {
      throw error
    }
  }
}

export const PostProduct = (data) => {
  return async (dispatch) => {
    try {
      const product = await CreateProduct(data)
      dispatch({ type: CREATE_PRODUCT, payload: product.data })
    } catch (error) {
      throw error
    }
  }
}

export const ClearRecentlyAdded = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CLEAR_RECENTLY_ADDED })
    } catch (error) {
      throw error
    }
  }
}
