const express = require("express");
const router = express.Router();
const generatePassword = require("../utils/passwordGenerator");

module.exports = (db) => {
  // POST route to handle user addition
  router.post("/administrative_manager/AddUserPage", (req, res) => {

    const user = req.body;
    let sql;
    const password = generatePassword(); // Generate a random password

    if (user.type === "أم") {
      sql = `INSERT INTO Mother (ID, first_name, last_name, phone_No, City, husband_name, husband_phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          user.ID,
          user.first_name,
          user.last_name,
          user.phone_No,
          user.City,
          user.husband_name,
          user.husband_phone,
          password,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ message: "Error adding mother to the database" });
            return;
          }
          res.json({
            message: "Mother added successfully, Password: " + password,
          });
        }
      );
    } else if (user.type === "طفل") {
      sql = `INSERT INTO Child (ID, first_name, last_name, gender, DOB, Child_Serial_No, blood_type, allergies, mom_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          user.ID,
          user.first_name,
          user.last_name,
          user.gender,
          user.DOB,
          user.Child_Serial_No,
          user.blood_type,
          user.allergies,
          user.mom_ID,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ message: "Error adding child to the database" });
            return;
          }
          res.json({
            message: "Child added successfully, Password: " + password,
          });
        }
      );
    } else if (user.type === "طبيب") {
      sql = `INSERT INTO Doctor (ID, first_name, last_name, medical_ID_No, phone_No, password) VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          user.ID,
          user.first_name,
          user.last_name,
          user.medical_ID_No,
          user.phone_No,
          password,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ message: "Error adding doctor to the database" });
            return;
          }
          res.json({
            message: "Doctor added successfully, Password: " + password,
          });
        }
      );
    }
  });

  return router;
};
