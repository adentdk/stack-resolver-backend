'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      display_name: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false
      },
      full_name: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false
      },
      avatar: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: true
      },
      gender: {
        type: Sequelize.DataTypes.ENUM('male', 'female'),
        allowNull: true
      },
      address_location: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};