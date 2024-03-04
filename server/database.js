// const { response } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5432",
    database: "todo_pgdb"
});

// const createTblQry = `CREATE TABLE accounts (
//     user_id serial PRIMARY KEY,
//     title VARCHAR ( 255 ) NOT NULL
// );`;

// pool.query("CREATE DATABASE todolist;")
// .then((Response)=>{
//     console.log('Database created');
//     console.log(response);
// }).catch((err)=>{
//     console.log(err);
// });


module.exports = pool;