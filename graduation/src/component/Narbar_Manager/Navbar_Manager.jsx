import React from "react";
import { Link } from "react-router-dom";
import "./Navbar_Manager.css";

const Navbar_Manager = () => {
  return (
    <div className="info-box">
      <div className="options">
        <Link to="/administrative_Manager/home" className="option-btn">
          الصفحة الرئيسية
        </Link>
        <hr className="line" />
        <Link to="/administrative_manager/AddUserPage" className="option-btn">
          اضافة مستخدم
        </Link>
        <Link to="/administrative_manager/AppointmentManagerPage" className="option-btn">
          إدارة مواعيد العيادة
        </Link>
        <Link to="/administrative_manager/AddArticlePage" className="option-btn">
          إدارة المحتوى الثقافي
        </Link>
        <hr className="line" />
        <Link to="/login" className="option-btn logout">
          تسجيل الخروج
        </Link>
      </div>
    </div>
  );
};

export default Navbar_Manager;
