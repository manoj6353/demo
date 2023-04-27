"use strict";
const { Model, sequelize, DataTypes } = require("sequelize");
const db = require("./index");
// const { Academic } = require("./academic");
// const Exprience = require("./exprience");
// const Language = require("./language");
// const Technology = require("./technology");
module.exports = (sequelize, DataTypes) => {
  class candidate_basic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  candidate_basic.hasMany(db.Academic, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  candidate_basic.hasMany(db.Exprience, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  candidate_basic.hasMany(db.Language, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  candidate_basic.hasMany(db.Technology, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  return candidate_basic;
};
