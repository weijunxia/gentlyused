'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        title: 'gap sweater',
        description: 'like new black gap logo sweater',
        size: 'S',
        price: 50,
        sold: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products')
  }
}
