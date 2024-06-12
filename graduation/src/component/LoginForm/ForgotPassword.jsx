import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Simulate a network request with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate a successful response
      notification.success({
        message: "Password Reset",
        description: "تم ارسال كلمة المرور الجديدة الى الهاتف المحمول",
      });
    } catch (error) {
      // Simulate an error response
      notification.error({
        message: "Error",
        description: "An error occurred while resetting the password",
      });
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <div className="forgot-password-header">
          <h2>Reset Password</h2>
        </div>
        <Form name="forgot-password-form" onFinish={handleResetPassword}>
          <Form.Item
            name="userId"
            rules={[{ required: true, message: "Please enter your ID" }]}
          >
            <Input
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ID"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              اعادة تعيين كلمة المرور
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
