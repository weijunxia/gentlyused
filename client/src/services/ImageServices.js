import Client from '.'

export const GetUploadUrl = async (data) => {
  try {
    const res = await Client.post('/images/upload', data, {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const GetImagesByProductId = async (id) => {
  try {
    const res = await Client.get(`/images/product/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetImagesByUserId = async (id) => {
  try {
    const res = await Client.get(`/images/user/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteImage = async (id) => {
  try {
    const res = await Client.delete(`/images/delete/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllImages = async () => {
  try {
    const res = await Client.get(`/images/all`)
    console.log(res)
    return res
  } catch (error) {
    throw error
  }
}
