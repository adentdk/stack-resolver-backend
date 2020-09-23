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
        onDelete: 'cascade',
        references: {
          model: 'topics',
        }
      },
      parent_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        onDelete: 'cascade',
        references: {
          model: 'comments',
        }
      },
      created_by: {
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
    await queryInterface.dropTable('comments');
  }
};