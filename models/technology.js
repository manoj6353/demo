"use strict";
const { Model, sequelize, DataTypes } = require("sequelize");
// const Basic = require("./candidate_basic");
const db = require("./index");
module.exports = (sequelize, DataTypes) => {
  class technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  technology.init(
    {
      technoloy_name: DataTypes.STRING,
      rating: DataTypes.STRING,
      candidate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "technology",
    }
  );
  technology.belongsTo(db.Technology, {
    foreignKey: "candidate_id",
    constraints: false,
  });
  return technology;
};
