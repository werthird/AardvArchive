const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Snippet extends Model {
}

Snippet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'category',
    //     key: 'id',
    //   }
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'snippet',
  }
);

module.exports = Snippet;