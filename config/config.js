require('dotenv').config()
module.exports = {
  development: {
    database: 'gentlyused_development',
    dialect: 'postgres'
  },
  test: {
    database: 'gentlyused_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
