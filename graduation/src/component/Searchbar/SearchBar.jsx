// SearchBar.js
import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <Space>
  <Search
    placeholder="البحث باستخدام الاسم او رقم الهوية"
    allowClear
    enterButton="بحث"
    size="large"
    onSearch={handleSearch}
    style={{ width: "350px", direction: "rtl" }}
  />
</Space>
  );
};

export default SearchBar;
