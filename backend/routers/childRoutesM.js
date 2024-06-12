const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Corrected API endpoint
  router.get("/api/mother/MotherChildCard/:userId", (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM Child WHERE mom_ID = ?";
    console.log("test");
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        // No children found, return an empty array with a 200 status code
        return res.status(200).json([]);
      }
      res.json(results);
    });
  });

  return router;
};
