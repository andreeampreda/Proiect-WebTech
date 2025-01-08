import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const port = 8080;
      const response = await fetch(`http://localhost:${port}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const message = await response.json();
        alert("Login successful!");
        console.log(message);
        localStorage.setItem("user", message.user.username);
        localStorage.setItem("firstName", message.user.firstName);
        localStorage.setItem("lastName", message.user.lastName);
        localStorage.setItem("role", message.user.role);

        navigate("/home");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <form action="" id="form" onSubmit={handleSubmit}>
        <h1>Welcome, User!</h1>
        <div className="input-box">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <i className="bx bx-user"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don't have an account?
            <a href="#" id="signup-btn">
              {" "}
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
