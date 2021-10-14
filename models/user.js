'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'product_user_id',
        as: 'users_products'
      })
      User.belongsToMany(models.Product, {
        through: models.Favorite,
        as: 'user_favorite',
        foreignKey: 'favorite_user_id'
      })
      User.hasMany(models.Order, {
        foreignKey: 'order_user_id'
      })
      User.hasMany(models.Image, {
        foreignKey: 'image_user_id'
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password_digest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      deleted: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
