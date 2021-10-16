import Client from '.'

export const AddToFavorites = async ({
  favorite_user_id,
  favorite_product_id
}) => {
  try {
    const res = Client.post('/favorites', {
      favorite_user_id,
      favorite_product_id
    })
    console.log(res)
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
