const exp = require("constants");
const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

//defining parameters to create a connection with the mysql db
const db = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
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

app.use(express.json());

//API to get the list of users from the database
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM USERS";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

//API to get the user details using id parameter from the database
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM USERS WHERE ID=?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      throw err;
    } else res.json(results);
  });
});

//API to insert a user record in the database
app.post("/users/add", (req, res) => {
  const { name, email, age, city } = req.body;
  const sql = "INSERT INTO USERS(NAME , EMAIL , AGE , CITY) VALUES(?,?,?,?)";
  db.query(sql, [name, email, age, city], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json({ message: "Users record inserted successfully" });
    }
  });
});

//API to update user information in the database
app.put("/users/edit/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age, city } = req.body;
  const sql =
    "UPDATE USERS SET NAME=? , EMAIL = ? , AGE = ? , CITY = ? WHERE ID = ?";
  db.query(sql, [name, email, age, city, id], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json({ message: "User record edited" });
    }
  });
});

//API to delete user information in the database
//This is not a soft delete
app.delete("/users/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM USERS WHERE ID = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json({ message: "User record deleted" });
    }
  });
});

//Listening to the application on the specified port
app.listen(PORT);
