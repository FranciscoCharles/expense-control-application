'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('ExpenseList', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
    },
      {
        freezeTableName: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExpenseList');
  }
};
