import React, { useEffect, useState } from 'react';
import "./HomeA.css"; // Import CSS file for styling

const HomeA = () => {
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
    <div className='appointments'>
      <h2>مواعيد اليوم</h2>
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
              <tr key={index}>
                <td>{appointment.mother_name}</td>
                <td>{appointment.Time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-appointments">لا توجد مواعيد لليوم</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default HomeA;
