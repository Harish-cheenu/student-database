const mysql = require('mysql')
const express = require('express')
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"school"
});
  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/Add',(req,res)=>{
    const Name = req.body.name;
    const Gender = req.body.gender;
    const DOB = req.body.dob;
    // console.log(Name+" "+Gender+" "+DOB)
    db.query("INSERT INTO school.students (Name,Gender,DOB) VALUES (?,?,?)",
    [Name,Gender,DOB],
    (err,result)=>{
        if(err) throw err;
        else{
            res.send("Added")
        }
    })
})


app.get('/getAll',(req,res)=>{
    db.query('SELECT * FROM students; ',
    (err,result)=>{
        if(err) throw err;
        else{
            // console.log(result)
            res.json(result)
        }
    });
})

app.delete('/delete:id',(req,res)=>{
    let del_id = req.params.id
    db.query(`DELETE FROM students WHERE s_id = "${del_id}";`,
    (err,result)=>{
        if(err) throw err;
        else{
            res.status(200)
        }
    })
    // db.query(`ALTER table school.students drop s_id;
    // ALTER table school.students add s_id int auto_increment primary key;`,
    // (err,result)=>{
    //     if(err) console.log(err)}
    // )
})

app.get('/update:id',(req,res)=>{
    let del_id = req.params.id
    db.query(`SELECT * FROM students WHERE s_id = "${del_id}"; `,
    (err,result)=>{
        if(err) throw err;
        else{
            // console.log(result)
            res.json(result)
            console.log((result))
        }
    });
})
app.post('/edit:id',(req,res)=>{
    let del_id = req.params.id
    const Name = req.body.Name;
    const Gender = req.body.Gender;
    const DOB = req.body.Dob;

    db.query(`UPDATE school.students SET Name="${Name}", Gender="${Gender}",DOB="${DOB}" WHERE s_id="${del_id}" `,
    (err,result)=>{
        if(err) throw err;
        else{
            res.setHeader('X-Foo', 'bar')
            res.send("Edited")
        }
    })
})

app.listen(3001,()=>(
    console.log('Running...')
))