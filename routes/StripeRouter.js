const controller = require('../controllers/StripeController')
const router = require('express').Router()
const bodyParser = require('body-parser')
router.post('/payment', controller.StripePaymentIntent)
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  controller.StripeWebhook
)
module.exports = router
