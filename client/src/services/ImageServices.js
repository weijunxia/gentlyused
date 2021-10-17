import Client from '.'

export const GetUploadUrl = async ({
  image_user_id,
  image_product_id,
  file_name
}) => {
  try {
    const res = await Client.post('/images', {
      image_user_id,
      image_product_id,
      file_name
    })
    return res
  } catch (error) {
    throw error
  }
}

export const DeleteImage = async (id) => {
  try {
    const res = await Client.delete(`/images/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllImages = async () => {
  try {
    const res = Client.get(`/images`)
    return res.data
  } catch (error) {
    throw error
  }
}
