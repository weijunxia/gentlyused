require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const StripePaymentIntent = async (req, res) => {
  const { product, user_email } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: user_email,
      metadata: {
        integration_check: 'accept_a_payment'
      }
    })
    res.status(200).json({ client_secret: paymentIntent.client_secret })
  } catch (error) {
    console.log(error)
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}

const StripeWebhook = async (req, res) => {
  let event
  const signature = req.headers['stripe-signature']
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    res.json({ received: true })
  } catch (error) {
    console.log(`Webhook signature verification failed.`)
    return res.status(400)
  }
  switch (event.type) {
    case 'payment_intent.succeeded':
      // send an order confirmation email to your customer, log the sale in a database, or start a shipping workflow. You find the data response on  `event.data`
      console.log('PaymentIntent was successful!')
      break
    case 'payment_intent.created':
      console.log('PaymentIntent was created!')
      break
    case 'payment_method.attached':
      console.log('PaymentMethod was attached to a Customer!')
      break
    case 'payment_method.created':
      console.log('PaymentMethod was created!')
      break
    case 'charge.succeeded':
      console.log('Charge succeeded!')
      break
    case 'payment_intent.payment_failed':
      console.log('Payment failed!')
      return res.status(400).end()
    default:
      // Unexpected event type
      return res.status(400).end()
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200).json({ received: true })
}

module.exports = {
  StripePaymentIntent,
  StripeWebhook
}
