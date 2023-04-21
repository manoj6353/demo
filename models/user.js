module.exports = (sequelize, DataTypes, Model) => {
  class user extends Model {}
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        underscored: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        underscored: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.ENUM,
        values : ['panding','complete'],
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "user",
    }
  );
  return user;
};
