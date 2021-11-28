'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Expense', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
      },
    },
      {
        freezeTableName: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Expense');
  }
};
