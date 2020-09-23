'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.ENUM('init', 'replies'),
        allowNull: false,
        defaultValue: 'replies'
      },
      topic_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'topics',
          onDelete: 'cascade'
        }
      },
      parent_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'comments',
          onDelete: 'cascade'
        }
      },
      created_by: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          onDelete: 'cascade'
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
    await queryInterface.dropTable('comments');
  }
};