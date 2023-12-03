const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./util/database');

const date = require('./modules/date');
const student = require('./modules/student');
const presenty = require('./modules/presenty');

const homePageRoute = require('./routes/homePage');
const attendanceInfoRoute = require('./routes/attendance');

app.use(bodyParser.json())

app.use(express.static('public'));

date.belongsToMany(student,{through:presenty});
student.belongsToMany(date,{through:presenty});

app.use(homePageRoute);
app.use(attendanceInfoRoute);

sequelize
.sync()
.then(res=>{
    app.listen(2000);  
})

