module.exports = (sequelize,DataTypes,Model) => {
class user extends Model{};
user.init({
    firstName :{
        type : DataTypes.STRING,
        allowNull : false
    },
    lastName :{
        type : DataTypes.STRING,
        allowNull : false
    },
    email :{
        type : DataTypes.STRING,
        allowNull : false
    }
    },{
        sequelize,
        modelName : 'user'
    })
    return user;
}