require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const moment = require("moment");
const mysql = require("mysql");

// Configure AWS SDK
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS();

// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

const app = express();
const port = 3000;

// Function to send SNS message
const sendMessage = (phoneNumber, message) => {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };

  sns.publish(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log("Message sent:", data);
  });
};

// Function to calculate age and send message
const checkAndSendMessages = () => {
  const query =
    "SELECT id, first_name, last_name, DOB, mother_phone FROM Child";
  db.query(query, (err, results) => {
    if (err) throw err;

    results.forEach((child) => {
      const dob = moment(child.DOB);
      const now = moment();
      const ageInMonths = now.diff(dob, "months");

      const title =
        "تذكير بحجز موعد جديد لتطعيم طفلك من خلال موقع العيادة الرسمي";
      const message = `${title}\nعمر طفلك ${ageInMonths} شهر اليوم. يرجى زيارة الموقع الرسمي للعيادة لحجز موعد التطعيم.`;

      if ([0, 1, 2, 4, 6, 12, 18].includes(ageInMonths)) {
        sendMessage(child.mother_phone, message);
      }
    });
  });
};

// Schedule the checkAndSendMessages function to run daily
setInterval(checkAndSendMessages, 24 * 60 * 60 * 1000); // 24 hours

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
