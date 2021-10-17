import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import {
  useStripe,
  useElements,
  CardNumberElement
} from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CCSection from './CCSection'
import { CreateOrder } from '../services/OrderServices'
import { StripePayment } from '../services/StripeServices'

const mapStateToProps = ({
  userState,
  orderState,
  productState,
  stripeState
}) => {
  return { userState, orderState, productState, stripeState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: ({ data }) => dispatch(CreateOrder({ data })),
    // update product to sold
    //
    createStripePayment: ({ product, user_email }) =>
      dispatch(StripePayment({ product, user_email }))
  }
}

function Billing(props) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const billingDetails = (values) => {
    return {
      address: {
        city: values.city,
        country: values.country,
        state: values.state,
        line1: values.address,
        line2: null
      },
      first_name: values.first_name,
      last_name: values.last_name
    }
  }

  const handleElementChange = (event) => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError('')
    }
  }

  const afterPaymentSuccess = (paymentIntent) => {
    dispatch(clearCart())
    const { amount, id } = paymentIntent
    history.push(`/success?amount=${amount}&id=${id}`, { from: 'checkout' })
  }

  const onSubmit = async (values, { setSubmitting }) => {
    setError('')
    const isStripeLoading = !stripe || !elements
    if (isStripeLoading) {
      setSubmitting(false)
      return
    }
    try {
      const {
        data: { client_secret: clientSecret }
      } = await props.createStripePayment()
    } catch (error) {}
  }
  return <Form></Form>
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing)
