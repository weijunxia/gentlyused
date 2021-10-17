import { SET_STRIPE_SUCCESS, TOGGLE_STRIPE_CONTAINER } from '../types'

const iState = {
  successStatus: false,
  stripeContainerToggle: false
}

const StripeReducer = (state = iState, action) => {
  switch (action.type) {
    case SET_STRIPE_SUCCESS:
      return { ...state, successStatus: !state.successStatus }
    case TOGGLE_STRIPE_CONTAINER:
      return { ...state, stripeContainerToggle: !state.stripeContainerToggle }
    default:
      return state
  }
}

export default StripeReducer
