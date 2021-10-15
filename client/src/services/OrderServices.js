import Client from '.'

export const CreateOrder = async (data) => {
  try {
    const res = await Client.post('/order/create', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const DeleteOrder = async (id) => {
  try {
    const res = await Client.delete(`/order/delete/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
