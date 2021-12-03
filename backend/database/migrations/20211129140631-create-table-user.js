'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('User', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
      }
    },
      {
        freezeTableName: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
