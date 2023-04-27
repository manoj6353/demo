"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tagable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tagable.init(
    {
      taggableid: DataTypes.INTEGER,
      taggabletype: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tagable",
    }
  );
  return tagable;
};
