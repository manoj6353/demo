"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class academic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      academic.belongsTo(models.candidate_basic, {
        foreignKey: "candidate_id",
        constraints: false,
      });
    }
  }
  academic.init(
    {
      course: DataTypes.STRING,
      board: DataTypes.STRING,
      year: DataTypes.STRING,
      percentage: DataTypes.STRING,
      candidate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "academic",
    }
  );
  return academic;
};
