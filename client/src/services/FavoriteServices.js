import Client from '.'

export const AddToFavorites = async (userId, productId) => {
  try {
    const res = Client.post('/favorites', userId, productId)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RemoveFromFavorites = async (id) => {
  try {
    const res = Client.delete(`/favorites/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
