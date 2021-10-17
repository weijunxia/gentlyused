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
    const res = Client.get(`/images/all`)
    return res.data
  } catch (error) {
    throw error
  }
}
