import React from "react";
import Statistics from "../../../component/statistics/Statistics";
import NavbarD from "../../../component/NavbarDoc/NavbarDoc";
import Footer1 from "../../../component/Footer/Footer1";
import './StatisticsPage.css'
const StatisticsPage = () => {
  return (
    <div>
      <div>
        <NavbarD />
      </div>
      <div>
        <Statistics />
      </div>
      <div className="footer1">
        <Footer1/>
      </div>
    </div>
  );
};

export default StatisticsPage;
