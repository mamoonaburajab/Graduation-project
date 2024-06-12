import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./FormLogin.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3121/login", {
        username,
        password,
      });
      if (response.data.success) {
        // Set items in localStorage
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Navigate to the home page of the user's role
        navigate(`/${response.data.role}/home`);
      } else {
        alert("Authentication failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed due to server error.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Form name="login-form" onFinish={handleLogin} style={{ width: "250px" }}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال رقم الهوية بشكل صحيح",
            },
            {
              pattern: /^\d{9}$/,
              message: "الرجاء ادخال رقم الهوية بالشكل الصحيح ",
            },
          ]}
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="رقم الهوية"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال كلمة المرور بالشكل الصحيح",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            تسجيل الدخول
          </Button>
        </Form.Item>
        <Form.Item className="gaust-btn">
          <Button className="gaust" href="/guast" type="primary">
            المتابعة كضيف{" "}
          </Button>
        </Form.Item>
        <Form.Item className="gaust-btn">
          <Link className="forget" to="/forgotPassword">
            نسيت كلمة المرور؟
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
