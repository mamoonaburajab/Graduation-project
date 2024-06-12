const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route to get measurements for a child
  router.get("/api/doctor/measurement/:childID", (req, res) => {
    const { childID } = req.params;
    const sql = "SELECT * FROM Measurements WHERE Child_ID = ?";
    db.query(sql, [childID], (err, results) => {
      if (err) {
        console.error("Error fetching measurements:", err);
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
  router.post("/api/doctor/measurement", (req, res) => {
    const {
      age,
      weight,
      height,
      head_circumference,
      vitamin_A_D,
      vitamin_capsule_A,
      Iron,
      Child_ID,
    } = req.body;

    // Ensure required fields are present
    if (
      !age ||
      !weight ||
      !height ||
      !head_circumference ||
      !vitamin_A_D ||
      !vitamin_capsule_A ||
      !Iron ||
      !Child_ID
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const newMeasurement = {
      date: currentDate,
      age,
      weight,
      height,
      head_circumference,
      vitamin_A_D,
      vitamin_capsule_A,
      Iron,
      Child_ID,
    };

    const sql = "INSERT INTO Measurements SET ?";
    db.query(sql, newMeasurement, (err, result) => {
      if (err) {
        console.error("Error adding measurement:", err.sqlMessage);
        return res.status(500).send(err.sqlMessage);
      }
      res.json({ id: result.insertId, ...newMeasurement });
    });
  });

  return router;
};
