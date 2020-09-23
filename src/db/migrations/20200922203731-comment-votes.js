'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment_votes', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      comment_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'comments',
        }
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
    await queryInterface.dropTable('comment_votes');
  }
};