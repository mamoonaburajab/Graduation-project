import React, { useState } from "react";
import "./TwelfthMonth.css"; // Import the CSS file for styling

const TwelfthMonthForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    PCV: false,
    PCV_ID: "",
    MMR: false,
    MMR_ID: "",
    Doctor_Name: "",
  });

  const doctors = ["د. سميث", "د. جونسون", "د. لي"]; // Example list of doctors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit("twelfthMonth", formData);
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="form-group">
        <label>
          PCV:
          <input
            className="checkbox"
            type="checkbox"
            name="PCV"
            checked={formData.PCV}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف PCV:
          <input
            type="text"
            name="PCV_ID"
            value={formData.PCV_ID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          MMR:
          <input
            type="checkbox"
            name="MMR"
            checked={formData.MMR}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف MMR:
          <input
            type="text"
            name="MMR_ID"
            value={formData.MMR_ID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          اسم الطبيب:
          <select
            name="Doctor_Name"
            value={formData.Doctor_Name}
            onChange={handleChange}
          >
            <option value="">اختر طبيب</option>
            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="submit-button">
        إرسال
      </button>
    </form>
  );
};

export default TwelfthMonthForm;
