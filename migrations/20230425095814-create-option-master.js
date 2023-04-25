"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("option_masters", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        option_name: {
          type: Sequelize.STRING,
        },
        select_id: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("option_masters", {
          type: "FOREIGN KEY",
          name: "FK_select_master",
          fields: ["select_id"],
          references: {
            table: "select_masters",
            field: "id",
          },
          onDelete: "no action",
          onUpdate: "no action",
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("option_masters");
  },
};
