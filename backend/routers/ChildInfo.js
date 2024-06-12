const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 4406;

// MySQL connection with Promise support
const dbConfig = {
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
};
let db;

async function initializeDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Terminate the app if the database connection fails
  }
}

app.use(cors());
app.use(express.json());

// Endpoint to get child information
app.get("/api/doctor/child/ChildInfoPage/:id", async (req, res) => {
  const { id } = req.params;

  const sqlQuery = `
    SELECT c.*, m.first_name AS mother_first_name, m.last_name AS mother_last_name
    FROM Child c
    JOIN Mother m ON c.mom_ID = m.ID
    WHERE c.ID = ?;
  `;

  try {
    const [results] = await db.execute(sqlQuery, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Child not found" });
    }
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});
// Endpoint to get notes for a specific child
app.get("/api/doctor/child/notes/:childId", async (req, res) => {
  const { childId } = req.params;

  const sqlQuery = `
    SELECT *
    FROM Notes
    WHERE Child_ID = ?;
  `;

  try {
    const [results] = await db.execute(sqlQuery, [childId]);
    res.json(results);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
