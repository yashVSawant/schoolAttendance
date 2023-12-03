const date = require('../modules/date');
const student = require('../modules/student');
const presenty = require('../modules/presenty');

exports.getstudents = async(req,res,next)=>{
    try{
        const students = await student.findAll();
        res.json(students);
    }catch(err){
        console.log(err);
    }
    
}

exports.postStudent = async(req,res,next)=>{
    const studentName = req.body.data;
    try{
        const postedStudent = await student.create(studentName);
        res.json(postedStudent);
    }catch(err){
        console.log(err)
    }
}

exports.postDateInfo = async(req,res,next)=>{
    const postDate = req.query.id;
    const data = req.body.array;
    try{
        const getDate = await date.create({date:postDate});
        for(let currentStudent of data){
            const present = currentStudent.present
            const id = currentStudent.id
            const getStudent = await student.findByPk(id)
            const getExist = await getStudent.addDates(getDate,{through:{present:present}})     
        }
        res.send('posted')
    }catch(err){
        console.log(err)
    }
    
}


exports.getDateInfo = async(req,res,next)=>{
    const checkDate = req.query.date;
    try{
        const findDate = await date.findByPk(checkDate);
        res.json(findDate);
    }catch(err){
        console.log(err);
    }  
}

exports.getMarkedAttendance = async(req,res,next)=>{
    const presentyDate = req.query.date;
    //console.log("pres",presentyDate);
    try{   
        const getPresenty = await presenty.findAll({where:{DateDate:presentyDate}});
        res.json(getPresenty);
    }catch(err){
        console.log(err)
    }

}

exports.getFetchedAttendance = async(req,res,next)=>{
    
    try{
        const students = await student.findAll();
        const totalDays = await date.count();
        const count = [];
        for(let data of students){
            const id = data.id;
            const getCount = await presenty.count({
                where:{
                    studentId:id,
                    present:true
                }
            })

            count.push({'id':id,'present':getCount,'days':totalDays});
        }

        res.json(count);
    }catch(err){
        console.log(err)
    }
}
