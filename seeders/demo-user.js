"use strict";
const faker = require("faker");
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await Sequelize.transaction();
    try{
    queryInterface
    var data = [];
    for (let i = 0; i < 10; i++) {
      const insertdata = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.push(insertdata);
    }
    await queryInterface.bulkInsert("Users", data, { transaction: t});
    await queryInterface.bulkInsert("emp", data , { transaction: t});
    await t.commit();
  }
  catch (err) {
    await t.rollback();
    console.log(err);
  }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
