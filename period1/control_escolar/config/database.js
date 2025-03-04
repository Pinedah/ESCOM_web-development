
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('control_escolar', 'root', 'panke', {
    host: 'localhost',
    dialect: 'mysql' // cambiar a 'postgres', 'sqlite', 'mssql' segun la base de datos
});

module.exports = sequelize;