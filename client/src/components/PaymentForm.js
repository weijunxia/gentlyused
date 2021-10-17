import React from 'react'
import { connect } from 'react-redux'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { SetStripePayment } from '../store/actions/StripeActions'
import '../styles/paymentform.css'
const mapStateToProps = ({ stripeState }) => {
  return { stripeState }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setStripePayment: ({ data }) => SetStripePayment({ data })
  }
}

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' }
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee'
    }
  }
}

function PaymentForm(props) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    if (!error) {
      try {
        const response = await props.setStripePayment({ paymentMethod })
        return response.data
      } catch (error) {
        console.log(error)
        throw error
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      {!props.stripeState.successStatus ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="payment_form_group">
            <div className="payment_form_row">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="payment_form_button">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Congrats on your new Gently Used Garment</h2>
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
