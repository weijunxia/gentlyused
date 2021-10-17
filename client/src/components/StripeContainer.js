import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'
const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
const stripeTestPromise = loadStripe(STRIPE_PUBLIC)

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
}

export default StripeContainer
