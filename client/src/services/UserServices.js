import Client from '.'

export const GetAllUsers = async () => {
  try {
    const res = await Client.get('/users')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUsernameProfile = async (username) => {
  try {
    const res = await Client.get(`/users/${username}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUserEmailProfile = async (email) => {
  try {
    const res = await Client.get(`/users/email/${email}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUsersStore = async (id) => {
  try {
    const res = await Client.get(`/users/shop/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
// export const AddOrRemoveUserFavorite = async (username, productId) => {
//   try {
//     const res = await Client.get('/users/toggle/favorites', username, productId)
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }
export const GetUserFavorites = async (id) => {
  try {
    const res = await Client.get(`/users/favorites/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUserOrders = async (id) => {
  try {
    const res = await Client.get(`/users/orders/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteUser = async (id) => {
  try {
    const res = await Client.delete(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
