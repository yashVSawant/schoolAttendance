const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const date = sequelize.define('Date',{
    date:{
        type:Sequelize.DATEONLY,
        primaryKey:true
    }
});

module.exports = date;