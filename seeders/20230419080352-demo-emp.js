"use strict";
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    var data = [];
    for (let i = 0; i < 10; i++) {
      const insertdata = {
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.push(insertdata);
    }
    return queryInterface.bulkInsert("Users", data);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
