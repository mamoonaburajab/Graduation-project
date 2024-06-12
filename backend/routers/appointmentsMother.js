const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 4504;

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust the locale and options as needed
}

// Helper function to get the day of the week
function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", { weekday: "long" }); // 'ar-EG' for Arabic day names
}

// Route to get appointments for a specific mother
app.post("/Mother/ViewApp", (req, res) => {
  const motherId = req.body.motherId;
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const query = `
    SELECT * FROM Appointments 
    WHERE Mother_ID = ? 
    ORDER BY date ASC, time ASC;
  `;

  db.query(query, [motherId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    const upcomingAppointments = [];
    const pastAppointments = [];

    results.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date).setHours(0, 0, 0, 0);
      const formattedAppointment = {
        ...appointment,
        date: formatDate(appointment.date),
        day: getDayOfWeek(appointment.date),
      };

      if (appointmentDate >= currentDate) {
        upcomingAppointments.push(formattedAppointment);
      } else {
        pastAppointments.push(formattedAppointment);
      }
    });

    res.json({ upcomingAppointments, pastAppointments });
  });
});

// Route to delete an appointment
app.delete("/Mother/ViewApp/:appointmentId", (req, res) => {
  const appointmentId = req.params.appointmentId;

  const query = "DELETE FROM Appointments WHERE Mother_ID = ?";

  db.query(query, [appointmentId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send({ message: "Appointment deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
