const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 4015; // Ensure the port matches with your frontend fetch calls.

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

app.get("/api/mother/MotherChildCard/Vac/:childId", async (req, res) => {
  const { childId } = req.params;
  const tables = [
    "After_Birth",
    "First_Month",
    "Second_month",
    "Fourth_month",
    "Sixth_month",
    "Twelfth_month",
    "Eighteenth_month",
  ];
  let data = {};

  try {
    for (let table of tables) {
      const query = `SELECT * FROM ${table} WHERE Child_ID = ?;`;
      const [results] = await db.execute(query, [childId]);
      data[table.toLowerCase()] = results;
    }
    res.json(data);
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
