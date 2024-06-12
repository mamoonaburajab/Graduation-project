import React, { useState } from "react";
import axios from "axios";
import { Calendar, TimePicker, Button, message } from "antd";
import moment from "moment";
import "./BookAppointment.css"; // Ensure you import the CSS to style Ant components
import NavbarM from "../navbarMom/NavbarM";
import Footer1 from "../Footer/Footer1";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const disabledDate = (current) => {
    // Can not select Fridays and days before today
    return current.day() === 5 || current < moment().startOf("day");
  };

  const disabledHours = () => {
    // Disable hours outside of 8 AM to 2 PM
    let hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 8 || i >= 14) {
        hours.push(i);
      }
    }
    return hours;
  };

  const onPanelChange = (value) => {
    console.log(value.format("YYYY-MM-DD"));
    setSelectedDate(value);
  };

  const onTimeChange = (time) => {
    console.log(time ? time.format("HH:mm:ss") : "No time selected");
    setSelectedTime(time);
  };

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      message.error("الرجاء اختيار التاريخ والوقت.");
      return;
    }

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const formattedTime = selectedTime.format("HH:mm:ss");
    const Mother_ID = localStorage.getItem("userId");

    console.log("Preparing to submit booking with the following data:", {
      date: formattedDate,
      time: formattedTime,
      Mother_ID: Mother_ID,
    });

    if (!Mother_ID) {
      message.error("No mother ID found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5007/mother/Appointment",
        {
          date: formattedDate,
          time: formattedTime,
          Mother_ID: Mother_ID, // Ensure this matches exactly with the backend expected field
        }
      );

      message.success("تم جحز الموعد بالشكل الصحيح");
      console.log("Booking submitted:", response.data);
    } catch (error) {
      message.error(
        "فشل حجز موعد جديد: " +
          (error.response ? error.response.data : "Network error")
      );
      console.error("Error submitting booking:", error.response);
    }
  };

  return (
   <div className="bg-appointment">
    <NavbarM/> 
    <h1 className="new-app">الرجاء حجز موعد جديد</h1>
     <div
      style={{
        width: 300,
        margin: "auto",
        marginTop: 80,
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
    
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        disabledDate={disabledDate}
      />
      <TimePicker
        format="HH:mm"
        use12Hours
        minuteStep={30}
        placeholder="Select Time"
        onChange={onTimeChange}
        disabledHours={disabledHours}
        style={{ margin: "10px 0" }}
      />
      <Button
        type="primary"
        onClick={handleBookingSubmit}
        style={{ marginTop: 10 }}
      >
        Submit
      </Button>
    </div>
    <Footer1/>
   </div>
  );
};

export default BookAppointment;
