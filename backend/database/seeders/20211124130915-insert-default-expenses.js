const {Op} = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const current_date = new Date();
    return await queryInterface.bulkInsert('ExpenseList', [
      { title: "ExpenseList example 1", date: current_date },
      { title: "ExpenseList example 2", date: current_date },
      { title: "ExpenseList example 3", date: current_date },
      { title: "ExpenseList example 4", date: current_date },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('ExpenseList', {
        title:{
          [Op.startsWith]:"ExpenseList example"
        }
    }, {});
  }
};
