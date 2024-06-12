const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/api/Doctor/Appointments", (req, res) => {
    const query = `
      SELECT 
        a.ID, 
        a.Time,
        DATE_FORMAT(a.date, '%Y-%m-%d %H:%i:%s') AS date,
        m.first_name AS mother_name
      FROM 
        Appointments AS a 
        JOIN Mother AS m ON a.Mother_ID = m.ID
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching appointments:", err);
        res
          .status(500)
          .json({ error: "Internal server error", details: err.message });
        return;
      }

      res.json(results);
    });
  });

  // Route to update appointment status
  router.patch("/api/Doctor/Appointments/:id", (req, res) => {
    const appointmentId = req.params.id;
    const { status } = req.body;

    // Validate the status
    if (status !== 0 && status !== 1) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }

    const query = "UPDATE Appointments SET status = ? WHERE ID = ?";

    db.query(query, [status, appointmentId], (err, result) => {
      if (err) {
        console.error("Error updating appointment status:", err);
        res
          .status(500)
          .json({ error: "Internal server error", details: err.message });
        return;
      }

      res.json({ message: "Appointment status updated successfully" });
    });
  });

  return router;
};
