import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import FormLogin from "../../component/LoginForm/FormLogin";
import Footer1 from "../../component/Footer/Footer1";

const Login = () => {
  return (
    <div className="contaner11">
      <div className="contaner"></div>
      <div className="form-contaner">
        <div className="form">
          <h1 className="title">تسجيل الدخول</h1>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
