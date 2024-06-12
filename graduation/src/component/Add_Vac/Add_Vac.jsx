import React, { useState } from "react";
import AfterBirthForm from "../AfterBirth/AfterBirth";
import FirstMonthForm from "../FirstMonth/FirstMonth";
import SecondMonthForm from "../SecondMonth/SecondMonth";
import FourthMonthForm from "../FourthMonth/FourthMonth";
import SixthMonthForm from "../SixthMonth/SixthMonth";
import TwelfthMonthForm from "../TwelfthMonth/TwelfthMonth";
import EighteenthMonthForm from "../EighteenthMonth/EighteenthMonth";
import "./Add_Vac.css"; // Import the CSS file

const Add_Vac = () => {
  const [selectedForm, setSelectedForm] = useState("");

  const handleSubmit = (formType, formData) => {
    // Extract child_id from the URL
    const url = window.location.href;
    const childId = url.substring(url.lastIndexOf("/") + 1);

    const endpoint = `http://localhost:5012/Doctor/child/Vac/${childId}`;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formType, ...formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`${formType} Success:`, data);
        alert(`${formType} data submitted successfully`);
      })
      .catch((error) => {
        console.error(`${formType} Error:`, error);
        alert(`An error occurred while submitting the ${formType} data`);
      });
  };

  const handleChange = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">نموذج التطعيم</h1>
      <select className="select" onChange={handleChange} value={selectedForm}>
        <option value="">اختر التطعيم</option>
        <option value="afterBirth">بعد الولادة</option>
        <option value="firstMonth">الشهر الأول</option>
        <option value="secondMonth">الشهر الثاني</option>
        <option value="fourthMonth">الشهر الرابع</option>
        <option value="sixthMonth">الشهر السادس</option>
        <option value="twelfthMonth">الشهر الثاني عشر</option>
        <option value="eighteenthMonth">الشهر الثامن عشر</option>
      </select>

      <div className="form-container">
        {selectedForm === "afterBirth" && (
          <AfterBirthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "firstMonth" && (
          <FirstMonthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "secondMonth" && (
          <SecondMonthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "fourthMonth" && (
          <FourthMonthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "sixthMonth" && (
          <SixthMonthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "twelfthMonth" && (
          <TwelfthMonthForm handleSubmit={handleSubmit} />
        )}
        {selectedForm === "eighteenthMonth" && (
          <EighteenthMonthForm handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Add_Vac;
