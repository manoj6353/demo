"use strict";
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await db.User.update(
      { firstName: "manoj", lastName: "bajiya" },
      { where: { id: 1 } }
    );
  },

  async down(queryInterface, Sequelize) {},
};
