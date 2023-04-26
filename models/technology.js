'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  technology.init({
    technoloy_name: DataTypes.STRING,
    rating: DataTypes.STRING,
    candidate_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'technology',
  });
  return technology;
};