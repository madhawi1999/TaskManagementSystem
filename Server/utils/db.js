import mysql from 'mysql'

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanagementsystem'
})

con.connect(function(err){
    if (err){
    console.log('Connection error')
    }else{
        console.log('Connection established')
    }
})

export default con