'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      var data = [];
      for (let i = 0; i < 10; i++) {
        const insertdata = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        };
        data.push(insertdata);
      }
      // await contact.bulkCreate(data);
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
