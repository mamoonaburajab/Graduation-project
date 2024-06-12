import React, { useEffect, useState } from "react";
import "./AppointmentDoc.css"; // Import CSS file for styling
import AppointmentRow from "../AppointmentRow/AppointmentRow";

const AppointmentDoc = () => {
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3121/api/administrative_manager/AppointmentManager"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        console.log("Fetched appointments:", data); // Log the fetched data

        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

        // Filter appointments for today
        const filteredAppointments = data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date)
            .toISOString()
            .slice(0, 10);
          console.log("Appointment Date:", appointmentDate, "Today:", today);
          return appointmentDate === today;
        });

        console.log("Filtered today's appointments:", filteredAppointments); // Log the filtered appointments

        setTodaysAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="AppointmentDoc">
      <h1> مواعيد اليوم</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>وقت الموعد</th>
          </tr>
        </thead>
        <tbody>
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map((appointment, index) => (
              <AppointmentRow
                key={index}
                name={appointment.mother_name}
                ageInMonths={appointment.ageInMonths}
                appointmentTime={appointment.Time}
             
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">لا توجد مواعيد لليوم</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDoc;
