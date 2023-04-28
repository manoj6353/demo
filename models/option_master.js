"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      option_master.belongsTo(models.select_master, {
        foreignKey: "select_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });

      // define association here
    }
  }
  option_master.init(
    {
      option_name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "option_master",
    }
  );
  return option_master;
};
