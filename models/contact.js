module.exports = (sequelize,DataTypes) => {
const contact = sequelize.define('contact',{
    parmanent_address :{
        type : DataTypes.STRING,
        allowNull : false
    },
    current_address :{
        type : DataTypes.STRING,
        allowNull:false
    }
    },{

    })
    return contact;
}