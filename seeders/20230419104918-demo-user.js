"use strict";
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = [];
    for (let i = 1; i < 10; i++) {
      const insertdata = {
        title: faker.name.firstName(),
        userid: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.push(insertdata);
    }
    return queryInterface.bulkInsert("Posts", data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Posts",{ id : [2,3,4] });
  },
};
