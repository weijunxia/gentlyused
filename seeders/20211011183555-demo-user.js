const { v4: uuidv4 } = require('uuid')
const faker = require('faker')

const users = [...Array(5)].map((user) => ({
  id: uuidv4(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password_digest: faker.internet.password(4),
  createdAt: new Date(),
  updatedAt: new Date()
}))

;('use strict')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users')
  }
}
