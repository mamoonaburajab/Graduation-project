// Child.js
import React, { useState, useEffect } from "react";
import NavbarD from "../../../component/NavbarDoc/NavbarDoc";
import CardChildDoc from "../../../component/cardChildDoc/CardChildDoc";
import SearchBar from "../../../component/Searchbar/SearchBar";
import axios from "axios";

const Child = () => {
  const [children, setChildren] = useState([]);
  const [filteredChildren, setFilteredChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("http://localhost:3121/api/doctor/child");
        setChildren(response.data);
        setFilteredChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };
    fetchChildren();
  }, []);

  const handleSearch = (searchQuery) => {
    const filtered = children.filter(child =>
      child.first_name.includes(searchQuery) ||
      String(child.ID).includes(searchQuery)
    );
    setFilteredChildren(filtered);
  };

  return (
    <div>
      <NavbarD />
      <div className="childHeader" style={{ marginTop: "100px" }}>
        <SearchBar onSearch={handleSearch} />
        <div>
          {filteredChildren.map((child) => (
            <CardChildDoc
              key={child.ID}
              first_name={child.first_name}
              last_name={child.last_name}
              ID={child.ID}
              BOD={child.DOB}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Child;
