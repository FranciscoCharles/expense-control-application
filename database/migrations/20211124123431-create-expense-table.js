'use strict';
const Expense = require('../../models/Expense');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {id_expense_list, ...schema_def} = Expense.definition(Sequelize.DataTypes);
    return await queryInterface.createTable(Expense.name, schema_def);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(Expense.name);
  }
};
