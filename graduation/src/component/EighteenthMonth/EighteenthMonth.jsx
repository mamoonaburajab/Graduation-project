import React, { useState } from 'react';
import './EighteenthMonth.css'; // Import the CSS file for styling

const EighteenthMonthForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    OPV: false,
    OPV_ID: '',
    MMR: false,
    MMR_ID: '',
    DPT: false,
    DPT_ID: '',
    Doctor_Name: ''
  });

  const doctors = ['د. سميث', 'د. جونسون', 'د. لي']; // Example list of doctors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit("eighteenthMonth", formData);
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
          DPT:
          <input
            type="checkbox"
            name="DPT"
            checked={formData.DPT}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          معرف DPT:
          <input
            type="text"
            name="DPT_ID"
            value={formData.DPT_ID}
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

export default EighteenthMonthForm;
