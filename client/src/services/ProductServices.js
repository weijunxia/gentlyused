import Client from '.'
export const GetAllProducts = async () => {
  try {
    const res = await Client.get('/products')
    return res
  } catch (error) {
    throw error
  }
}

export const GetAllProductsAndFavorites = async () => {
  try {
    const res = await Client.get('/products/all/favorites')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetProductById = async (id) => {
  try {
    const res = await Client.get(`/products/${id}`)
    console.log('res', res)
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetFavoritesForProduct = async (product_id) => {
  try {
    const res = await Client.get(`/products/favorite/${product_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetProductSearch = async (query) => {
  try {
    const res = await Client.get(`/products/search/${query}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateProduct = async (data) => {
  try {
    const res = await Client.post(`/products`, data)
    return res
  } catch (error) {
    throw error
  }
}
export const UpdateProduct = async (id, data) => {
  try {
    const res = await Client.put(`/products/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteProduct = async (id) => {
  try {
    const res = await Client.delete(`/products/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
