const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

module.exports = (db, JWT_SECRET) => {
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userTables = [
      "Mother",
      "Doctor",
      "administrative_Manager",
      "System_administrator",
    ];
    let found = false;

    for (let table of userTables) {
      if (!found) {
        try {
          const query = `SELECT ID, '${table}' AS role FROM ${table} WHERE ID = ? AND Password = ?`;
          const [results] = await db
            .promise()
            .query(query, [username, password]);
          if (results.length > 0) {
            found = true;
            const token = jwt.sign(
              { userId: results[0].ID, role: table },
              JWT_SECRET,
              { expiresIn: "1h" }
            );
            console.log("userId", results[0].ID); // Debugging output
            console.log("Token:", token); // Debugging output
            console.log("Role:", table); // Debugging output
            res.send({
              success: true,
              userId: results[0].ID,
              token: token,
              role: table,
            });
            break; // Exit the loop once a match is found
          }
        } catch (error) {
          console.error("Query error:", error);
          res
            .status(500)
            .send({ success: false, message: "Database query failed" });
          return;
        }
      }
    }
    if (!found) {
      res.status(401).send({ success: false, message: "Invalid credentials" });
    }
  });

  return router;
};
