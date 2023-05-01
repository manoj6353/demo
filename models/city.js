"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      city.belongsTo(models.state, {
        foreignKey: "state_id",
      });
      // define association here
    }
  }
  city.init(
    {
      city_name: DataTypes.STRING,
      state_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "city",
    }
  );
  return city;
};
