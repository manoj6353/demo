"use strict";
const { Model, sequelize, DataTypes } = require("sequelize");
// const Basic = require("./candidate_basic");
const db = require("./index");
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  language.init(
    {
      language_name: DataTypes.STRING,
      reads: DataTypes.STRING,
      writes: DataTypes.STRING,
      speaks: DataTypes.STRING,
      candidate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "language",
    }
  );
  language.belongsTo(db.Basic, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  return language;
};
