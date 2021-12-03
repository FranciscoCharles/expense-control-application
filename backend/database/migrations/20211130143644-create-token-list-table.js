'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('RefreshToken', {
      id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true // Automatically gets converted to SERIAL for postgres
			},
      user: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        },
      },
      token: Sequelize.DataTypes.STRING,
      expires: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    },
      {
        freezeTableName: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RefreshToken');
  }
};
