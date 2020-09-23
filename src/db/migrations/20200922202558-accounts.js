'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(64),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false
      },
      is_online: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        onDelete: 'cascade',
        references: {
          model: 'users',
        }
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
    await queryInterface.dropTable('accounts');
  }
};