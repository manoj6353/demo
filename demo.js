const mysql = require("mysql2");
const express = require("express");
const app = express();
const PORT  = "8080";
dbname = 'demo'
try
{
    const db = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "root"
    })
    db.connect((err) => {
        if (err) throw err;
            console.log("connected");
            let sql = db.query(`create database if not exists ${dbname}`, (err, result) => {
                if (err) throw err;
                    console.log("database created");
            })
            db.changeUser({database : dbname});
            db.query('CREATE TABLE if not exists demo (id INT, name VARCHAR(255))', (err, result) => {
                if(err) throw err;
                    console.log("table created");
            })
    })
}
catch(err)
{

    console.log(err);
}

app.listen(PORT, () => console.log(`port connected to ${PORT}!`));