import { CreateOrder, DeleteOrder } from '../../services/OrderServices'

const { CREATE_ORDER, DELETE_ORDER } = require('../types')

export const PostOrder = (data) => {
  return async (dispatch) => {
    try {
      const order = await CreateOrder(data)
      dispatch({ type: CREATE_ORDER, payload: order.data })
    } catch (error) {
      throw error
    }
  }
}

export const RemoveOrder = (id) => {
  return async (dispatch) => {
    try {
      const res = await DeleteOrder(id)
      dispatch({ type: DELETE_ORDER, payload: res.data })
    } catch (error) {}
  }
}
