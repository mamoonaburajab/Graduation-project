import React, { useEffect, useState } from "react";
import "./Addmanager.css";

const AddManager = () => {
  const [managers, setManagers] = useState([]);
  const [view, setView] = useState("form");

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = () => {
    fetch("http://localhost:3121/administrative_manager/home")
      .then((response) => response.json())
      .then((data) => setManagers(data))
      .catch((error) => {
        console.error("Error fetching managers:", error);
        alert("Failed to fetch managers.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const managerData = {
      ID: formData.get("ID"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone_No: formData.get("phone_No"),
    };

    fetch("http://localhost:3121/administrative_manager/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(managerData),
    })
      .then((response) => response.json())
      .then((newManager) => {
        alert("تم اضافة مدير اداري");
        setManagers([...managers, newManager]);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add manager.");
      });

    event.target.reset(); // Reset the form fields after submission
  };

  return (
    <div className="add-manager-container">
      <h2>إدارة المدراء</h2>
      <div className="buttons-container">
        <button onClick={() => setView("form")}>اضافة مدير اداري</button>
        <button onClick={() => setView("list")}>قائمة المدراء</button>
      </div>
      {view === "form" && (
        <form onSubmit={handleSubmit}>
          <input
            name="first_name"
            className="form-input"
            type="text"
            placeholder="الاسم الأول"
            required
          />
          <input
            name="last_name"
            className="form-input"
            type="text"
            placeholder="الاسم الأخير"
            required
          />
          <input
            name="ID"
            className="form-input"
            type="text"
            placeholder="رقم الهوية"
            required
          />
          <input
            name="phone_No"
            className="form-input"
            type="text"
            placeholder="رقم الهاتف"
            required
          />
          <button className="submit-button" type="submit">
            إضافة
          </button>
        </form>
      )}
      {view === "list" && (
        <div className="managers-list">
          <h3>قائمة المدراء</h3>
          {managers.map((manager, index) => (
            <div key={index}>
              <p>
                {manager.first_name} {manager.last_name} - {manager.phone_No}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddManager;
