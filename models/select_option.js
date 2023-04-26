"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class select_option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  select_option.init(
    {
      select_id: DataTypes.INTEGER,
      option_id: DataTypes.INTEGER,
      active: DataTypes.ENUM("success", "panding", "progress"),
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.active = "progress";
        },
      },
      sequelize,
      modelName: "select_option",
    }
  );
  return select_option;
};
