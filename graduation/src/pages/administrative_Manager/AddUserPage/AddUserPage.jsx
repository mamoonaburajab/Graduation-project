import React from "react";
import AddUser from "../../../component/AddUser/AddUser";
import Navbar_Manager from "../../../component/Narbar_Manager/Navbar_Manager";
import "./AddUserPage.css";

const AddUserPage = () => {
  return (
    <div className="addUserPage">
      <div>
        <Navbar_Manager />
      </div>
      <div className="Add-user-card">
        <AddUser />
      </div>
    </div>
  );
};

export default AddUserPage;
