import Client from '.'

export const GetAllProducts = async () => {
  try {
    const res = await Client.get('/products')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetProductById = async (id) => {
  try {
    const res = await Client.get(`/products/${id}`)
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

export const GetProductFavorites = async () => {}
export const CreateProduct = async (data) => {
  try {
    const res = await Client.post(`/products`, data)
    return res.data
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