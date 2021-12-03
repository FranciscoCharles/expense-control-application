module.exports = {
	name: 'RefreshToken',
	definition(DataTypes) {
		return ({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true // Automatically gets converted to SERIAL for postgres
			},
			user: {
				type: DataTypes.INTEGER,
				references: {
					model: 'User',
					key: 'id'
				},
			},
			token: DataTypes.STRING,
			expires:{
        type: DataTypes.STRING,
        allowNull: false,
				get(){
					return (new Date(this.getDataValue('expires'))).getTime();
				}
			},
			/* virtual functions */
			isExpired:{
				type: DataTypes.VIRTUAL,
				get(){
					return Date.now() >= this.expires;
				}
			},
			isActive:{
				type: DataTypes.VIRTUAL,
				get(){
					return !this.isExpired;
				}
			}
		});
	},
	options: {
		freezeTableName: true,
	}
}