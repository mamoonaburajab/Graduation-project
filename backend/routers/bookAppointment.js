const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database!");
});

// Define the booking endpoint
app.post("/mother/Appointment", (req, res) => {
  const { date, time, Mother_ID } = req.body;

  if (!date || !time || !Mother_ID) {
    return res.status(400).send("Missing required fields");
  }

  handleBooking(date, time, Mother_ID, res);
});

function handleBooking(date, time, Mother_ID, res) {
  const dayOfWeek = new Date(date).getDay();
  if (dayOfWeek === 5) {
    // Friday is 5
    return res.status(400).send("No reservations are allowed on Friday");
  }

  const bookingDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  if (
    bookingDateTime < new Date(now.setDate(now.getDate() + 1)) ||
    bookingDateTime > new Date(now.setDate(now.getDate() + 14))
  ) {
    return res
      .status(400)
      .send(
        "Bookings must be made at least 1 day and no more than 2 weeks in advance"
      );
  }

  const bookingHour = bookingDateTime.getHours();
  if (bookingHour < 8 || bookingHour >= 14) {
    return res.status(400).send("Appointments must be between 8 AM and 2 PM");
  }

  // Check for existing appointments and the half-hour gap
  const query = `
    SELECT * FROM Appointments
    WHERE date = ?
    AND (ABS(TIMESTAMPDIFF(MINUTE, Time, ?)) < 30)`;

  db.query(query, [date, time], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }
    if (results.length > 0) {
      return res
        .status(400)
        .send(
          "An appointment already exists at this time or within half an hour of this time"
        );
    }

    // Insert the new appointment
    const insertQuery = `
      INSERT INTO Appointments (date, Time, Mother_ID)
      VALUES (?, ?, ?)`;

    db.query(insertQuery, [date, time, Mother_ID], (err, results) => {
      if (err) {
        console.error("Database error on insert:", err);
        return res.status(500).send("Failed to book appointment");
      }
      res.send("Appointment booked successfully");
    });
  });
}

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
