"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class basic_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      basic_detail.hasMany(models.designation, {
        foreignKey: "basic_id",
        constraints: false,
      });
    }
  }
  basic_detail.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      full_address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.ENUM("Male", "Female", "Others"),
      dob: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "basic_detail",
    }
  );
  return basic_detail;
};
