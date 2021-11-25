module.exports = {
		name: 'Expense',
		definition(DataTypes){
			return ({
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					allowNull: false,
					primaryKey: true
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false
				},
				value: {
					type: DataTypes.DOUBLE,
					allowNull: false
				},
				id_expense_list: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: 'ExpenseList',
						key: 'id'
					},
					onDelete: 'CASCADE',
				}
			});
		},
		options:{
			freezeTableName: true,
		}
	}