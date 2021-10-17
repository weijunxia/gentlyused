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
      last_name: values.last_name,
      email: values.email
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
      } = await props.createStripePayment({ values })
      const cardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: billingDetails(values)
        }
      })
      if (cardPayment.error) {
        setError(cardPayment.error.message)
      } else if (cardPayment.paymentIntent) {
        afterPaymentSuccess(cardPayment.paymentIntent)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }
  let initValues = {
    first_name: '',
    last_name: '',
    email: ''
  }
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initValues}
      validate={(values) => {
        const errors = {}
        if (!values.first_name) {
          errors.first_name = 'First Name Required!'
        }
        if (!values.last_name) {
          errors.last_name = 'Last Name Required'
        }
        if (!values.email) {
          errors.email = 'Email Required!'
        }
        if (!values.address) {
          errors.address = 'Address Required!'
        }
        return error
      }}
      render={({ setSubmitting, submitError, onSubmit, values, pristine }) => (
        <form
          className="billing_form"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <Field name="first_name">
            {({ input, meta }) => (
              <div className="billing_form_field">
                <label className="billing_form_label">First Name</label>
                <input
                  className="billing_form_input"
                  {...input}
                  type="text"
                  placeholder="John"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="last_name">
            {({ input, meta }) => (
              <div className="billing_form_field">
                <label className="billing_form_label">Last Name</label>
                <input
                  className="billing_form_input"
                  {...input}
                  type="text"
                  placeholder="Doe"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="email">
            {({ input, meta }) => (
              <div className="billing_form_field">
                <label className="billing_form_label">Email</label>
                <input
                  className="billing_form_input"
                  {...input}
                  type="text"
                  placeholder="JohnDoe@mail.com"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="address">
            {({ input, meta }) => (
              <div className="billing_form_field">
                <label className="billing_form_label">Address</label>
                <input
                  className="billing_form_input"
                  {...input}
                  type="text"
                  placeholder="P. Sherman 42 Wallaby Way"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="zipcode">
            {({ input, meta }) => (
              <div className="billing_form_field">
                <label className="billing_form_label">Zip Code</label>
                <input
                  className="billing_form_input"
                  {...input}
                  type="text"
                  placeholder="42 Wallaby Way"
                />
                {(meta.error || meta.submitError) && meta.touched && (
                  <span>{meta.error || meta.submitError}</span>
                )}
              </div>
            )}
          </Field>
          <div>
            <CCSection
              stripe={stripe}
              setSubmitting={setSubmitting}
              handleChange={handleElementChange}
            />
          </div>
        </form>
      )}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing)
