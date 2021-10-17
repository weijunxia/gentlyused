import { StripePayment } from '../../services/StripeServices'

const { SET_STRIPE_SUCCESS, TOGGLE_STRIPE_CONTAINER } = require('../types')

export const SetStripePayment = ({ data }) => {
  return async (dispatch) => {
    try {
      const stripePaymentStatus = await StripePayment({ data })
      dispatch({ type: SET_STRIPE_SUCCESS, payload: stripePaymentStatus })
    } catch (error) {
      throw error
    }
  }
}

export const ToggleStripeContainer = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_STRIPE_CONTAINER })
    } catch (error) {
      throw error
    }
  }
}
