const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4801;

// Database connection setup
const db = mysql
  .createConnection({
    host: "localhost",
    user: "mamoon",
    password: "mamoon",
    database: "Clinic",
  })
  .promise();

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Route to get all statistics
app.get("/api/doctor/statistics", async (req, res) => {
  try {
    const [totalChildrenResults] = await db.query(
      "SELECT COUNT(*) AS totalChildren FROM Child"
    );
    const [maleChildrenResults] = await db.query(
      "SELECT COUNT(*) AS maleChildren FROM Child WHERE gender = 'ذكر'"
    );
    const [femaleChildrenResults] = await db.query(
      "SELECT COUNT(*) AS femaleChildren FROM Child WHERE gender = 'انثى'"
    );
    const [vaccinatedChildrenResults] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM After_Birth) AS after_birth,
        (SELECT COUNT(*) FROM First_Month) AS first_month,
        (SELECT COUNT(*) FROM Second_month) AS second_month,
        (SELECT COUNT(*) FROM Fourth_month) AS fourth_month,
        (SELECT COUNT(*) FROM Sixth_month) AS month_six,
        (SELECT COUNT(*) FROM Twelfth_month) AS Twelfth_month,
        (SELECT COUNT(*) FROM Eighteenth_month) AS Eighteenth_month
    `);

    res.json({
      totalChildren: totalChildrenResults[0].totalChildren,
      maleChildren: maleChildrenResults[0].maleChildren,
      femaleChildren: femaleChildrenResults[0].femaleChildren,
      vaccinatedChildren: vaccinatedChildrenResults[0],
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    return res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
