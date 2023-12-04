const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const sequelize = require('./util/database');
const date = require('./models/date');
const student = require('./models/student');
const presenty = require('./models/presenty');
const attendanceInfoRoute = require('./routes/attendance');

date.belongsToMany(student,{through:presenty});
student.belongsToMany(date,{through:presenty});

app.use(cors());
app.use(bodyParser.json());

app.use(attendanceInfoRoute);
app.use((req,res,next)=>{
    res.status(404).send('error:404');
})

sequelize
    .sync()
    .then(()=>{
        console.log('server port started');
        app.listen(2000); 
    })
    .catch(err=>{
        console.log(err);
    }) 

        
    


