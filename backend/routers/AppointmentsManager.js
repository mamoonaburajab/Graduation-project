const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/api/administrative_manager/AppointmentManager", (req, res) => {
    const query = `
      SELECT 
        a.ID, 
        a.Time,
        a.status,  -- Include the status field
        DATE_FORMAT(a.date, '%Y-%m-%d %H:%i:%s') AS date,
        CONCAT(m.first_name, ' ', m.last_name) AS mother_name
      FROM 
        Appointments AS a 
        JOIN Mother AS m ON a.Mother_ID = m.ID
      ORDER BY a.date ASC, a.Time ASC
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

  // Endpoint to update appointment status
  router.post(
    "/api/administrative_manager/updateAppointmentStatus/:id",
    (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const query = `
      UPDATE Appointments 
      SET status = ? 
      WHERE ID = ?
    `;

      db.query(query, [status, id], (err, results) => {
        if (err) {
          console.error("Error updating appointment status:", err);
          res
            .status(500)
            .json({ error: "Internal server error", details: err.message });
          return;
        }

        res.json({ message: "Appointment status updated successfully" });
      });
    }
  );

  return router;
};
