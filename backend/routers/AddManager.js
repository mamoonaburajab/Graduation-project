const express = require("express");
const router = express.Router();
const generatePassword = require("../utils/passwordGenerator");

module.exports = (db) => {
  // POST route to handle administrative manager addition
  router.post("/administrative_manager/home", (req, res) => {
    const manager = req.body;
    const password = generatePassword();
    let sql = `INSERT INTO administrative_Manager (ID, first_name, last_name, phone_No, password) VALUES (?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        manager.ID,
        manager.first_name,
        manager.last_name,
        manager.phone_No,
        password,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ message: "Error adding manager to the database" });
          return;
        }
        res.json({
          message: "Manager added successfully, Password: " + password,
        });
      }
    );
  });

  // GET route to fetch administrative managers
  router.get("/administrative_manager/home", (req, res) => {
    let sql = `SELECT ID, first_name, last_name, phone_No FROM administrative_Manager`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ message: "Error fetching managers from the database" });
        return;
      }
      res.json(results);
    });
  });

  return router;
};
