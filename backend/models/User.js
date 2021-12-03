module.exports = {
		name: 'User',
		definition(DataTypes){
			return ({
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					allowNull: false,
					primaryKey: true
				},
				first_name: {
					type: DataTypes.STRING,
					allowNull: false
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false
				},
				password:{
					type: DataTypes.STRING(60),
					allowNull: false
				},
			});
		},
		options:{
			freezeTableName: true,
		}
	}