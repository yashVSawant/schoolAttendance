
const search = document.getElementById('search');
const enter = document.getElementById('enter');
const submit = document.getElementById('submit');
const postAttendance = document.getElementById('postAttendance');
const fetchAttendance = document.getElementById('fetchAttendance');

search.addEventListener('click',async()=>{
    const date = document.getElementById('date');
    const attendanceInfo = document.getElementById('attendanceInfo');
    if(date.value){
        try{
            const students = await axios.get('http://localhost:2000/getStudents')
            if(attendanceInfo.children[0].children[1]){
                for(let data of students.data){
                    const getStudentDiv = document.getElementById(`${data.id}`)
                    getStudentDiv.removeChild(getStudentDiv.children[1]);
                }
            }
                
            const checkDate = await axios.get(`http://localhost:2000/getDate?date=${date.value}`);
            if(checkDate.data){
                const getData = await axios.get(`http://localhost:2000/getAttendance?date=${date.value}`);
                hidePostButton();
                for(let data of getData.data){
                    createMarked(data.StudentId,data.present);
                }
            }else{
                showPostButton();
                for(let data of students.data){
                    createRadio(data.id);
                }
                
            }
        }catch(err){
            console.log(err);
        }
    }else{
        const errorMsg = document.getElementById('error');
        errorMsg.style.display = 'inline';
        setTimeout(()=>{
            errorMsg.style.display = 'none'
        },2000)
    }
    
    

})

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const getStudents = await axios.get('http://localhost:2000/getStudents');
        if(getStudents.data.length === 0){
            const inputStudents = document.getElementById('inputStudents');
            const container = document.getElementById('container');
            inputStudents.style.display = 'inline';
            container.style.display = 'none'
        }else{
            const students = await axios.get('http://localhost:2000/getStudents')
            for(let data of students.data){          
                createStudents(data.name,data.id);
            }
        }
    }catch(err){
        console.log(err)
    }  
})

enter.addEventListener('click',async()=>{
    const name = document.getElementById('name');
    console.log(name.value);
    const data = {
        'name':name.value
    }
   try{
        await axios.post('http://localhost:2000/poststudent',{data});
        name.value = "";
   }catch(err){
        console.log(err)
   }
    
   
})

submit.addEventListener('click',()=>{
            const inputStudents = document.getElementById('inputStudents');
            const container = document.getElementById('container');
            inputStudents.style.display = 'none';
            container.style.display = 'inline'
})

postAttendance.addEventListener('click',async()=>{
    const date = document.getElementById('date');
    const array = [];
    try{
        const getStudent = await axios.get('http://localhost:2000/getStudents');
        for(let data of getStudent.data){
            const getRadio = document.getElementById(`radio${data.id}`);
            const present = getRadio.children[0].checked;
            array.push({'id':data.id,'present':present});
        }
        console.log(array);
        const postAttendance = await axios.post(`http://localhost:2000/postAttendance?id=${date.value}`,{array})
    }catch(err){
        console.log(err)
    }
})

fetchAttendance.addEventListener('click',async()=>{
    hidePostButton();
    try{
        const getData = await axios.get('http://localhost:2000/fetchedAttendance');
        const students = await axios.get('http://localhost:2000/getStudents')
            if(attendanceInfo.children[0].children[1]){
                for(let data of students.data){
                    const getStudentDiv = document.getElementById(`${data.id}`)
                    getStudentDiv.removeChild(getStudentDiv.children[1]);
                }
            }

        for(let data of getData.data){
            console.log(data.id,data.present);
            createTotalAttendance(data.id,data.present,data.days)
        }
    }catch(err){
        console.log(err)
    }
   
})

function createStudents(name,id){
    const attendanceInfo = document.getElementById('attendanceInfo');
    const studentNameDiv = document.createElement('div');
    const studentName = document.createElement('h3');

    studentNameDiv.className='students'
    studentNameDiv.id = id;
    studentName.innerText = name;

    studentNameDiv.appendChild(studentName);
    attendanceInfo.appendChild(studentNameDiv);
}

function createRadio(id){
    const studentDiv = document.getElementById(`${id}`);
    const radioDiv = document.createElement('div');
    const presentRadio = document.createElement('input');
    const absentRadio = document.createElement('input');
    const presentLable = document.createElement('p');
    const absentLable = document.createElement('p');

    radioDiv.id=`radio${id}`;
    radioDiv.className = 'info'
    presentRadio.type = 'radio';
    absentRadio.type = 'radio';
    presentLable.innerText='present';
    absentLable.innerText='absent'

    presentRadio.name = `${id}`;
    absentRadio.name= `${id}`;

    radioDiv.appendChild(presentRadio);
    radioDiv.appendChild(presentLable);
    radioDiv.appendChild(absentRadio);
    radioDiv.appendChild(absentLable);
    studentDiv.appendChild(radioDiv);
}

function createMarked(id,present){
    const studentDiv = document.getElementById(`${id}`);
    const markedDiv = document.createElement('div');
    const marked = document.createElement('p');
    
    const tik = present==true?'&#x2705':'&#10060';

    markedDiv.className ='info'
    marked.innerHTML= tik;
    markedDiv.appendChild(marked);
    studentDiv.appendChild(markedDiv);
}

function createTotalAttendance(id,presentDays,totalDays){
    const studentDiv = document.getElementById(`${id}`);
    const attendanceDiv = document.createElement('div');
    const presentOutOf = document.createElement('p');
    const presentPersentage = document.createElement('p');

    attendanceDiv.className='info'

    presentOutOf.innerText=`${presentDays}/${totalDays}`
    presentPersentage.innerText=`${presentDays/totalDays*100}%`

    attendanceDiv.appendChild(presentOutOf);
    attendanceDiv.appendChild(presentPersentage);

    studentDiv.appendChild(attendanceDiv)

}
function hidePostButton(){
    const postAttendance = document.getElementById('postAttendance');
    postAttendance.style.display = 'none';
}
function showPostButton(){
    const postAttendance = document.getElementById('postAttendance');
    postAttendance.style.display = 'inline';
}
