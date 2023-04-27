"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.image, {
        foreignKey: "commentid",
        constraints: false,
      });
      comment.belongsTo(models.video, {
        foreignKey: "commentid",
        constraints: false,
      });
    }
  }
  comment.init(
    {
      commentid: DataTypes.INTEGER,
      commenttype: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );

  return comment;
};
