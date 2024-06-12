const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const crypto = require("crypto");
const AWS = require("aws-sdk");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Configure AWS SDK
AWS.config.update({
  region: "us-east-1", // Update to your desired region
});

const sns = new AWS.SNS();

const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/ForgotPassword", (req, res) => {
  const { userId } = req.body;

  const newPassword = crypto.randomBytes(8).toString("hex");

  // Update the password in the database
  db.query(
    "UPDATE Mother SET password = ? WHERE ID = ?",
    [newPassword, userId],
    (error, results) => {
      if (error) {
        console.error("Database update error:", error);
        return res.status(500).json({ message: "Database update failed" });
      }

      // Fetch the user's phone number
      db.query(
        "SELECT phone_No FROM Mother WHERE ID = ?",
        [userId],
        (error, results) => {
          if (error) {
            console.error("Database fetch error:", error);
            return res
              .status(500)
              .json({ message: "Failed to fetch phone number" });
          }
          if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
          }

          const phoneNumber = results[0].phone_No;

          // Send the new password via SMS using Amazon SNS
          const params = {
            Message: `لقد تم تغيير كلمة المرور\nكلمة المرور الجديدة : ${newPassword}`,
            PhoneNumber: phoneNumber,
          };

          sns.publish(params, (err, data) => {
            if (err) {
              console.error("SNS publish error:", err);
              res.status(500).json({ message: "Failed to send SMS" });
            } else {
              res.status(200).json({ message: "New password sent via SMS" });
            }
          });
        }
      );
    }
  );
});

app.listen(4153, () => {
  console.log("Server is running on port 4153");
});
