'use strict'; 
require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
});
  
// console.log("HOST:", process.env.HOST);
// console.log("USER:", process.env.USER);
// console.log("PASSWORD:", process.env.PASSWORD === '' ? '[EMPTY STRING]' : process.env.PASSWORD);
// console.log("DATABASE:", process.env.DATABASE);

connection.connect((error)  =>    {
    if (error)throw error;
    console.log("connection sucessfull");
});

module.exports = connection;

