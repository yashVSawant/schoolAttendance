const Sequelize = require('sequelize');

const sequelize = new Sequelize('school-attendance','root','Yash1234',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;