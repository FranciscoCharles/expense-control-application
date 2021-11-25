'use strict';
const { ExpenseList } = require('../../models');
const { Op } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const expenseList = await ExpenseList.findOne({
      where: {
        title: {
          [Op.startsWith]: "ExpenseList example 1"
        }
      }
    });
    return await queryInterface.bulkInsert('Expense', [
      { title: "expense example 1", value: 30.0, id_expense_list: expenseList.id },
      { title: "expense example 2", value: 30.0, id_expense_list: expenseList.id },
      { title: "expense example 3", value: 30.0, id_expense_list: expenseList.id },
      { title: "expense example 4", value: 30.0, id_expense_list: expenseList.id },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const expenseList = await ExpenseList.findOne({
        where: {
          title: {
            [Op.startsWith]: "ExpenseList example 1"
          }
        }
      });
    return await queryInterface.bulkDelete('Expense', {
      id_expense_list: expenseList.id
    },{});
  }
};
