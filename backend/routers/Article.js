const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 4804;

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
    process.exit(1); 
  }
}

app.use(cors());
app.use(express.json());


app.get("/api/guast", async (req, res) => {
  const sqlQuery = "SELECT * FROM Articles;";

  try {
    const [results] = await db.execute(sqlQuery);
    res.json(results);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});
app.get("/api/Mother/home", async (req, res) => {
  const sqlQuery = "SELECT * FROM Articles;";

  try {
    const [results] = await db.execute(sqlQuery);
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
