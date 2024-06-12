import React from "react";
import Navbar_Manager from "../../../component/Narbar_Manager/Navbar_Manager";
import Article from "../../../component/Article/Article";
import './AddArticlePage.css'
const AddArticlePage = () => {
  return (
    <div className="Article-page">
      {" "}
      <div>
        <Navbar_Manager />
      </div>
      <div>
        <Article/>
      </div>
    </div>
  );
};

export default AddArticlePage;
