'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        id: 1,
        order_product_id: 3,
        order_user_id: '8ce87836-194f-4e0d-af9a-b3171ec245e6',
        first_name: 'Shawna',
        last_name: 'Pfeffer',
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
