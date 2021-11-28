'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Expense', 'id_expense_list',
      {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ExpenseList',
          key: 'id'
        },
        onDelete: 'CASCADE',
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Expense', 'id_expense_list');
  }
}
