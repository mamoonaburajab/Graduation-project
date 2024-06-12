const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/api/doctor/child", (req, res) => {
    const query = "SELECT * FROM Child";

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching children:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(results);
    });
  });

  return router;
};
