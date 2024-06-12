// Article.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import "./Article.css";

const Article = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      const defaultImage = image || "https://via.placeholder.com/150";
      const articleData = {
        title,
        text,
        image: defaultImage,
        link,
      };
      const response = await axios.post(
        "http://localhost:4905/api/administrative_manager/AddArticlePage",
        articleData
      );
      message.success("Article added successfully!");
      setTitle("");
      setText("");
      setLink("");
      setImage("");
    } catch (error) {
      console.error("Error adding article:", error);
      message.error("Failed to add article");
    }
  };

  return (
    <div className="Article-container-article">
      <div className="Article-card-article">
        <h2 className="notes-heading-article">Add New Article</h2>
        <Form onFinish={handleSubmit} className="notes-form-article">
          <Form.Item className="form-item-article">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="input-field-article"
            />
          </Form.Item>
          <Form.Item className="form-item-article">
            <Input.TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              rows={4}
              className="input-field-article"
            />
          </Form.Item>
          <Form.Item className="form-item-article">
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image link or leave blank for default image"
              className="input-field-article"
            />
          </Form.Item>
          <Form.Item className="form-item-article">
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter link"
              className="input-field-article"
            />
          </Form.Item>
          <Form.Item className="form-item-article">
            <Button type="primary" htmlType="submit" className="submit-button-article">
              Add Article
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Article;
