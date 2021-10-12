'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init(
    {
      favorite_product_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      favorite_user_id: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Favorite',
      tableName: 'favorites'
    }
  )
  return Favorite
}
