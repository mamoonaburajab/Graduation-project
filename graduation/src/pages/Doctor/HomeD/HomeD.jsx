import React from "react";
import "./HomeD.css";
import Slider from "../../../component/slider/Slider";
import Footer1 from "../../../component/Footer/Footer1";
import NavbarD from "../../../component/NavbarDoc/NavbarDoc";
import AppointmentDoc from "../../../component/AppointmentDoc/AppointmentDoc";

const HomeD = () => {
  return (
    <div className="home">
      <div>
        <div className="navbar1">
          <NavbarD />
        </div>
        <div className="link-website">
          {" "}
          الموقع الرسمي لوزارة الصحة الفلسطينية
          <a href="https://site.moh.ps/">
            {/* -> */}
            <span className="link-website-btn"> اضغط هنا</span>
          </a>
        </div>
        
        <div>
          <Slider />
        </div>
    <div>
      <AppointmentDoc/>
    </div>
        <div>
          <Footer1 />
        </div>
      </div>
    </div>
  );
};

export default HomeD;
