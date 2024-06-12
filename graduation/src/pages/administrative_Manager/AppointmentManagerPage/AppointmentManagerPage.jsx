import React from "react";
import Navbar_Manager from "../../../component/Narbar_Manager/Navbar_Manager";
import AppointmentManager from "../../../component/AppointmentManager/AppointmentManager";
import "./AppointmentManagerPage.css";
const AppointmentManagerPage = () => {
  return (
    <div className="bg-img">
      <div>
        <Navbar_Manager />
      </div>
      <div className="AppointmentManager-page">
        <AppointmentManager />
      </div>
    </div>
  );
};

export default AppointmentManagerPage;
