const { CREATE_ORDER, DELETE_ORDER, TOGGLE_ORDER_MODAL } = require('../types')

const iState = {
  order: [],
  orderModalToggle: false
}

const OrderReducer = (state = iState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case DELETE_ORDER:
      return { ...state, order: action.payload }
    case TOGGLE_ORDER_MODAL:
      return { ...state, orderModalToggle: !state.orderModalToggle }
    default:
      return { ...state }
  }
}

export default OrderReducer
