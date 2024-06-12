import React from "react";
import "./ChildInfoPage.css";
import NavbarD from "../../../component/NavbarDoc/NavbarDoc";
import ChildInfo from "../../../component/ChildInfo/ChildInfo";
const ChildInfoPage = () => {
  return (
    <div className="ChildInfo">
      <div>
        <NavbarD />
      </div>
      <div>
        <ChildInfo />
      </div>
    </div>
  );
};

export default ChildInfoPage;
