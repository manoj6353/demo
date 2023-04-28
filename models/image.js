"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      image.hasMany(models.comment, {
        foreignKey: "commentid",
        scope: {
          commenttype: "image",
        },
        constraints: false,
      });
      const table = models.tagable;
      image.belongsToMany(models.tag, {
        through: {
          model: "tagable",
          scope: {
            taggabletype: "image",
          },
        },
        foreignKey: "taggableid",
        constraints: false,
      });
    }
  }
  image.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "image",
    }
  );
  return image;
};
