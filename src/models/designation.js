"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      designation.belongsTo(models.basic_detail, {
        foreignKey: "basic_id",
        constraints: false,
      });
    }
  }
  designation.init(
    {
      position: DataTypes.STRING,
      company_name: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      basic_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "designation",
    }
  );
  return designation;
};
