const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to database with ID: " + db.threadId);
});

// API Endpoint to get measurements and DOB by child ID
app.get("/api/mother/MotherChildCard/childCard/:childId", (req, res) => {
  const { childId } = req.params;
  const sqlQuery = `
    SELECT m.*, c.DOB
    FROM Measurements m
    JOIN Child c ON m.Child_ID = c.ID
    WHERE m.Child_ID = ?
    ORDER BY m.date ASC
  `;
  db.query(sqlQuery, [childId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error fetching data from database", error });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: "No data found for this ID" });
    }
    const data = results[0];
    const ageInMonths = calculateAgeInMonths(data.DOB);
    res.json({ ...data, age: ageInMonths });
  });
});

// Function to calculate age in months from DOB
function calculateAgeInMonths(dob) {
  const birthDate = new Date(dob);
  const now = new Date();
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12;
  return months - birthDate.getMonth() + now.getMonth();
}

// Define the server port
const PORT = 4007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
