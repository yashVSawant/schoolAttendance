const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const student = sequelize.define('Student',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING
});

module.exports = student;