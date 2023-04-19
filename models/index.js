const { request } = require('express');
const {Sequelize, DataTypes, Model} = require ('sequelize');
const sequelize = new Sequelize('demo','root','',{
    host : 'localhost',
    logging : false,
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
        console.log("connection successfully");
}catch(err){
    console.log(err);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize=sequelize;

db.contact = require('./contact')(sequelize,DataTypes);
db.user = require('./user')(sequelize,DataTypes,Model)
db.sequelize.sync()

module.exports=db;