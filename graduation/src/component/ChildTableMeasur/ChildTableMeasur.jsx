import React, { useState, useEffect } from "react";
import { useChild } from "../../assets/useRef/ChildContext"; // Check the path
import "./ChildTableMeasur.css";

const ChildTableMeasur = () => {
  const { ID } = useChild();
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    age: "",
    weight: "",
    height: "",
    head_circumference: "",
    vitamin_A_D: "",
    vitamin_capsule_A: "",
    Iron: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3121/api/doctor/measurement/${ID}`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setData([]);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); // Set data to an empty array in case of error
      });
  }, [ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const newMeasurement = {
      age: newRow.age,
      weight: newRow.weight,
      height: newRow.height,
      head_circumference: newRow.head_circumference,
      vitamin_A_D: newRow.vitamin_A_D,
      vitamin_capsule_A: newRow.vitamin_capsule_A,
      Iron: newRow.Iron,
      Child_ID: ID,
      date: currentDate,
    };

    fetch("http://localhost:3121/api/doctor/measurement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeasurement),
    })
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => [...prevData, data]);
        setNewRow({
          age: "",
          weight: "",
          height: "",
          head_circumference: "",
          vitamin_A_D: "",
          vitamin_capsule_A: "",
          Iron: "",
        });
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container">
      <h1 className="title1">جدول القياسات</h1>

      {showForm && (
        <form className="form1" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text">العمر (بالاشهر):</span>
            <input
              className="input"
              type="text"
              name="age"
              required
              value={newRow.age}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">الوزن:</span>
            <input
              className="input"
              type="text"
              name="weight"
              required
              value={newRow.weight}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">الطول:</span>
            <input
              className="input"
              type="text"
              required
              name="height"
              value={newRow.height}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">محيط الرأس:</span>
            <input
              className="input"
              type="text"
              name="head_circumference"
              required
              value={newRow.head_circumference}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">فيتامين أ+د:</span>
            <input
              className="input"
              type="text"
              name="vitamin_A_D"
              required
              value={newRow.vitamin_A_D}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">فيتامين كابسويل أ:</span>
            <input
              className="input"
              type="text"
              name="vitamin_capsule_A"
              required
              value={newRow.vitamin_capsule_A}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <label className="label">
            <span className="label-text">الحديد:</span>
            <input
              className="input"
              type="text"
              name="Iron"
              required
              value={newRow.Iron}
              onChange={handleChange}
              pattern="\d*"
              title="الرجاء إدخال أرقام فقط"
            />
          </label>
          <button className="button" type="submit">
            إضافة
          </button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>العمر (بالاشهر)</th>
            <th>الوزن</th>
            <th>الطول</th>
            <th>محيط الرأس</th>
            <th>فيتامين أ+د</th>
            <th>فيتامين كابسويل أ</th>
            <th>الحديد</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.age}</td>
              <td>{row.weight}</td>
              <td>{row.height}</td>
              <td>{row.head_circumference}</td>
              <td>{row.vitamin_A_D}</td>
              <td>{row.vitamin_capsule_A}</td>
              <td>{row.Iron}</td>
              <td>{formatDate(row.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={toggleForm}>
        {showForm ? "إخفاء النموذج" : "إضافة قياس جديد"}
      </button>
    </div>
  );
};

export default ChildTableMeasur;
