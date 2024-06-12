const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Route to get measurements for a child
app.get('/api/doctor/measurement/:childID', (req, res) => {
  const { childID } = req.params;
  const sql = 'SELECT * FROM Measurements WHERE childID = ?';
  db.query(sql, [childID], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!Array.isArray(results)) {
      res.json([]);
    } else {
      res.json(results);
    }
  });
});

// Route to add a new measurement
app.post('/api/doctor/measurement', (req, res) => {
  const newMeasurement = req.body;
  const sql = 'INSERT INTO Measurements SET ?';
  db.query(sql, newMeasurement, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, ...newMeasurement });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
