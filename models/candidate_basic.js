"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class candidate_basic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      candidate_basic.hasMany(models.academic, {
        foreignKey: "candidate_id",
        constraints: false,
      });
      candidate_basic.hasMany(models.exprience, {
        foreignKey: "candidate_id",
        constraints: false,
      });
      candidate_basic.hasMany(models.language, {
        foreignKey: "candidate_id",
        constraints: false,
      });
      candidate_basic.hasMany(models.technology, {
        foreignKey: "candidate_id",
        constraints: false,
      });
    }
  }
  candidate_basic.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      contact_number: DataTypes.STRING,
      full_address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female", "Others"),
      dob: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "candidate_basic",
    }
  );
  return candidate_basic;
};
