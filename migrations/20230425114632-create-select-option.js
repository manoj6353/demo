"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("select_options", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      select_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "select_masters",
          key: "id",
        },
        onUpdate: "no action",
        onDelete: "no action",
      },
      option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "option_masters",
          key: "id",
        },
        onUpdate: "no action",
        onDelete: "no action",
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
    // await queryInterface.addConstraint("select_options", {
    //   type: "FOREIGN KEY",
    //   name: "FK_select_masters",
    //   fields: ["select_id"],
    //   references: {
    //     table: "select_masters",
    //     field: "id",
    //   },
    //   onDelete: "no action",
    //   onUpdate: "no action",
    // });

    // await queryInterface.addConstraint("select_options", {
    //   type: "FOREIGN KEY",
    //   name: "FK_option_masters",
    //   fields: ["option_id"],
    //   references: {
    //     table: "option_masters",
    //     field: "id",
    //   },
    //   onDelete: "no action",
    //   onUpdate: "no action",
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("select_options");
  },
};
