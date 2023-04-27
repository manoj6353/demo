"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: DataTypes.ENUM("panding", "complete"),
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.isActive = "panding";
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
