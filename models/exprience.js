"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exprience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exprience.init(
    {
      company_name: DataTypes.STRING,
      designation: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      candidate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "exprience",
    }
  );
  return exprience;
};
