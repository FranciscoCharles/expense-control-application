module.exports = {
		name: 'ExpenseList',
		definition(DataTypes){
			return ({
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					allowNull: false,
					primaryKey: true,
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false
				},
				date: {
					type: DataTypes.DATEONLY,
					allowNull: false
				},
			});
		},
		options:{
			freezeTableName: true,
		}
	}