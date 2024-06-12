import React from "react";
import AddManager from "../../component/AddManager/AddManager";
import "./Admin.css";
const Admin = () => {
  return (
    <div className="Admin">
      <nav className="navbar">
        <button className="nav-button">
          <a href="/login">تسجيل الخروج</a>
        </button>
      </nav>
      <AddManager />
    </div>
  );
};

export default Admin;
