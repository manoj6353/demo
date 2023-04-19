'use strict';
const db = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await db.User.destroy({ where: {id: 5}})
  },

  async down (queryInterface, Sequelize) {
    await db.User.restore({ where: { id : 1 }});
  }
};
