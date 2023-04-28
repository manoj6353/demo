"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      enrollment.belongsToMany(models.student, {
        through: "enrollment",
        foreignKey: "studentId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
      enrollment.belongsToMany(models.classes, {
        through: "enrollment",
        foreignKey: "classId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  enrollment.init(
    {
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "enrollment",
    }
  );
  return enrollment;
};
