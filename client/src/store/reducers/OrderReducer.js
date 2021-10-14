const { CREATE_ORDER, DELETE_ORDER } = require('../types')

const iState = {
  order: []
}

const OrderReducer = (state = iState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { ...state, order: action.payload }
    case DELETE_ORDER:
      return { ...state, order: action.payload }
    default:
      return { ...state }
  }
}

export default OrderReducer
