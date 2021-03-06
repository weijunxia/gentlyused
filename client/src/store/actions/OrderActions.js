import { CreateOrder, DeleteOrder } from '../../services/OrderServices'

const { CREATE_ORDER, DELETE_ORDER, TOGGLE_ORDER_MODAL } = require('../types')

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

export const ToggleOrderModal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_ORDER_MODAL })
    } catch (error) {
      throw error
    }
  }
}
