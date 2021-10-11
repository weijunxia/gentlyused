const { Order, Product, User } = require('../models')

const CreateOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body })
    res.send(order)
  } catch (error) {
    throw error
  }
}

const DeleteOrder = async (req, res) => {
  try {
    await Order.destroy({ where: { id: req.params.id } })
    res.send({ msg: 'Order Deleted', payload: req.params.id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateOrder,
  DeleteOrder
}
