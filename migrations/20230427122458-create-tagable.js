"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tagables", {
      tagid: {
        allowNull: false,
        unique: "tt_unique_constraint",
        type: Sequelize.INTEGER,
      },
      taggableid: {
        type: Sequelize.INTEGER,
      },
      taggabletype: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tagables");
  },
};
