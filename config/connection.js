const sequelize = require("sequelize");
require("dotenv").config("../.env");
const sql = new sequelize(
  process.env.db_name,
  process.env.user,
  process.env.pass,
  { dialect: "mysql", host: process.env.host, logging: false }
);

module.exports = sql;
