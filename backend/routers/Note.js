const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4120;

// Configure body-parser
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// API endpoint to add a note
app.post("/api/mother/MotherChildCard/Note", (req, res) => {
  const { note, childId } = req.body;
  if (!childId) {
    return res.status(400).send("Child ID must not be null");
  }
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
  const query = "INSERT INTO Notes (Note, Child_ID, Date) VALUES (?, ?, ?)";
  db.query(query, [note, childId, currentDate], (err, result) => {
    if (err) {
      console.error("Error adding note:", err);
      res.status(500).send("Server error");
      return;
    }
    res.status(201).send({
      message: "Note added successfully",
      note: note,
      date: currentDate,
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
