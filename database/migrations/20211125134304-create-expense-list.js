'use strict';
const ExpenseList = require('../../models/ExpenseList');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(ExpenseList.name, ExpenseList.definition(Sequelize.DataTypes));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(ExpenseList.name);
  }
};
