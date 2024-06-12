import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import "./Notes.css";

const Notes = () => {
  const [note, setNote] = useState("");
  const { childId } = useParams(); // Extract childId from the URL parameters

  const handleSubmit = async () => {
    if (!childId) {
      message.error("Child ID is missing");
      return; // Check if childId is available
    }
    try {
      const response = await axios.post(
        `http://localhost:4120/api/mother/MotherChildCard/Note`,
        { note, childId }
      );
      console.log("Response data:", response.data); // Log response data
      message.success("Note added successfully");
      setNote("");
    } catch (error) {
      console.error("Error adding note:", error);
      message.error("Failed to add note");
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-card">
        <h2 className="notes-heading">إضافة ملاحظة للطبيب</h2>
        <Form className="notes-form" onFinish={handleSubmit}>
          <Form.Item className="form-item element">
            <div className="custom-text">أدخل الملاحظات</div>
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="أدخل الملاحظات"
              rows={4}
              className="input-field"
            />
          </Form.Item>
          <Form.Item className="form-item element">
            <Button type="primary" htmlType="submit" className="submit-button">
              إضافة ملاحظة
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Notes;
