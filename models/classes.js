"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      classes.belongsToMany(models.student, {
        through: "enrollment",
        foreignKey: "classId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  classes.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  return classes;
};
