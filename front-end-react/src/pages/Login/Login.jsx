import React, { useState, useEffect } from "react";
import "./Login.css";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      setIsLogin(true);
    } else if (window.location.pathname === "/signup") {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="login">{isLogin ? <LoginForm /> : <SignUpForm />}</div>
  );
}

export default Login;
