// server.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 4905;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
};

let db;

async function initializeDatabase() {
  db = await mysql.createConnection(dbConfig);
  console.log("Successfully connected to the database.");
}

app.post("/api/administrative_manager/AddArticlePage", async (req, res) => {
  const { title, text, image, link } = req.body;
  const sqlQuery =
    "INSERT INTO Articles (Title, Text, Image, Link) VALUES (?, ?, ?, ?)";
  try {
    const [result] = await db.execute(sqlQuery, [title, text, image, link]);
    res.json({
      success: true,
      message: "Article added successfully",
      articleId: result.insertId,
    });
  } catch (error) {
    console.error("Failed to add article:", error);
    res.status(500).json({ error: "Failed to add article" });
  }
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
