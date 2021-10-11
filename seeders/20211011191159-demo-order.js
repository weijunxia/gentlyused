'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        id: 1,
        order_product_id: 6,
        order_user_id: '075aeeb2-ff43-4a57-b621-e7ba73e84c6e',
        first_name: 'Jayson',
        last_name: 'Thompson',
        address: '2515 124th St',
        city: 'Flushing',
        state: 'NY',
        country: 'US',
        grand_total: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders')
  }
}
