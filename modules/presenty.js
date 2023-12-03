const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const presenty = sequelize.define('Presenty',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    present:Sequelize.BOOLEAN
});

module.exports = presenty;