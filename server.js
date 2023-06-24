const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

//defining parameters to create a connection with the mysql db
const db = mysql.createConnection({
  host: "localhost",
  user: "yourdbusername",
  password: "yourdbpassword",
  database: "userdb",
});

//connecting to the mysql database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to the db");
});

//write a query to create a table if it doesnt exist
const createTable = `CREATE TABLE IF NOT EXISTS USERS(  
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
email VARCHAR(255),
age INT,
city VARCHAR(255)
)`;

//creating the table in the db
db.query(createTable, (err) => {
  if (err) {
    throw err;
  }
  console.log("Table created in the database");
});

//Listening to the application on the specified port
app.listen(PORT);
