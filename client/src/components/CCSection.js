import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: 16,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
}
function CCSection({ handleChange, isSubmitting, error, stripe }) {
  const total = useSelector((state) => state.total)
  return (
    <div>
      <label>
        Card number
        <CardNumberElement
          onChange={handleChange}
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          onChange={handleChange}
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          onChange={handleChange}
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <button type="submit" disabled={!stripe || isSubmitting}>
        {isSubmitting ? 'Submitting...' : `Pay ${total}`}
      </button>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default CCSection
