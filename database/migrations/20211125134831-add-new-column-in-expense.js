'use strict';
const Expense = require('../../models/Expense');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {id_expense_list} = Expense.definition(Sequelize.DataTypes);
    return await queryInterface.addColumn(Expense.name, 'id_expense_list', id_expense_list);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(Expense.name, 'id_expense_list');
  }
}
