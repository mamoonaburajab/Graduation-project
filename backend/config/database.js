const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
