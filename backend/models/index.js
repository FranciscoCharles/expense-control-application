const fs = require('fs');
const path = require('path');
const config = require('../config');
const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		/* sequelize < v6
		const model = sequelize.import(path.join(__dirname, file));*/
		const schema = require(path.join(__dirname, file));
		const model = sequelize.define(
			schema.name,
			schema.definition(Sequelize.DataTypes),
			schema.options
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;