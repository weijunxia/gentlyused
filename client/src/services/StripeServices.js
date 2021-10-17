import Client from '.'

export const StripePayment = async ({ product, user_email }) => {
  try {
    const res = await Client.post('/checkout/payment', { product, user_email })
    if (res.data.success) {
      console.log('Successful payment!')
    }
    return res.data.success
  } catch (error) {
    throw error
  }
}
