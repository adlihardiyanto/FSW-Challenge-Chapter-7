'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
      }
    },
      challengerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        } 
       },
      roomcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roomstatus: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      createdAt: {
       allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  }
};