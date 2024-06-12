import React, { useState } from 'react';
import './AfteBirht.css'; // Import the CSS file for styling

const AfterBirthForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    BCG: false,
    BCG_ID: '',
    Doctor_Name: ''
  });

  const doctors = ['د. اسيل حسن']; // Example list of doctors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Ensure BCG_ID is a number
    if (isNaN(formData.BCG_ID)) {
      alert("الرجاء إدخال رقم صحيح لـ BCG Lot No");
      return;
    }
    handleSubmit('afterBirth', formData);
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="form-group">
        <label>
          BCG:
          <input 
            className='checkbox'
            type="checkbox"
            name="BCG"
            checked={formData.BCG}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          BCG Lot No:
          <input
            type="text"
            name="BCG_ID"
            value={formData.BCG_ID}
            onChange={handleChange}
            placeholder='BCG Lot Number'
            required
            pattern="\d*"
            title="الرجاء إدخال أرقام فقط"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <select
            name="Doctor_Name"
            value={formData.Doctor_Name}
            onChange={handleChange}
            required
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

export default AfterBirthForm;
