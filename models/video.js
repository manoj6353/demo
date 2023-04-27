"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      video.hasMany(models.comment, {
        foreignKey: "commentid",
        constraints: false,
      });
      video.belongsToMany(models.tag, {
        through: "tagable",
        foreignKey: "taggableid",
        constraints: false,
      });
    }
  }
  video.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "video",
    }
  );
  return video;
};