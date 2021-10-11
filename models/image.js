'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, { foreignKey: 'image_user_id' })
      Image.belongsTo(models.Product, { foreignKey: 'image_product_id' })
    }
  }
  Image.init(
    {
      file_name: DataTypes.STRING,
      image_product_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      image_user_id: {
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
      modelName: 'Image',
      tableName: 'images'
    }
  )
  return Image
}
