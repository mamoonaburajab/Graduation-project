import React, { useState } from "react";
import "./FourthMonth.css"; // Import the CSS file for styling

const FourthMonthForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    OPV: false,
    OPV_ID: "",
    Rota_Virus: false,
    Rota_Virus_ID: "",
    Penta: false,
    Penta_ID: "",
    PCV: false,
    PCV_ID: "",
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
    handleSubmit("fourthMonth", formData);
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="form-group">
        <label>
          OPV:
          <input
            className="checkbox"
            type="checkbox"
            name="OPV"
            checked={formData.OPV}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف OPV:
          <input
            type="text"
            name="OPV_ID"
            value={formData.OPV_ID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          فيروس روتا:
          <input
            type="checkbox"
            name="Rota_Virus"
            checked={formData.Rota_Virus}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف فيروس روتا:
          <input
            type="text"
            name="Rota_Virus_ID"
            value={formData.Rota_Virus_ID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          خماسي:
          <input
            type="checkbox"
            name="Penta"
            checked={formData.Penta}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف خماسي:
          <input
            type="text"
            name="Penta_ID"
            value={formData.Penta_ID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          PCV:
          <input
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
      <button type="submit" className="submit-button">إرسال</button>
    </form>
  );
};

export default FourthMonthForm;
