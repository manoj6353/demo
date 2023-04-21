// const { request } = require("express");
// const { Sequelize, DataTypes, Model } = require("sequelize");

// const sequelize = new Sequelize("demo", "root", "root", {
//   host: "localhost",
//   logging: false,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 100,
//   },
// });

// try {
//   sequelize.authenticate();
//   console.log("connection successfully");
// } catch (err) {
//   console.log(err);
// }

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.student = require("./student")(sequelize, DataTypes);
// db.contact = require("./contact")(sequelize, DataTypes);

// db.student.hasOne(db.contact, { foreignKey: "student_id" });

// module.exports = db;

("use strict");
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
// console.log(config);
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize("demo", "root", "root", {
    host: "localhost",
    logging: false,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 100,
    },
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.student = require("./student")(sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);

module.exports = db;
