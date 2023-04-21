const { request } = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");
// const sequelize = new Sequelize("demo", "root", "root", {
//   host: "localhost",
//   logging : false,
//   dialect: "mysql",
// });
const sequelize = new Sequelize("demo", "root", "root", {
  host: "localhost",
  // logging: false,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 100,
  },
});

try {
  sequelize.authenticate();
  console.log("connection successfully");
} catch (err) {
  console.log(err);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes, Model);

module.exports = db;
