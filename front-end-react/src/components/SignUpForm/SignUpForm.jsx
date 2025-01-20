import React, { useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      username,
      password,
      role,
    };

    try {
      const port = 8080;
      const response = await fetch(`http://localhost:${port}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const message = await response.text();
        alert("Sign up successful!");
        Navigate("/home");
      } else {
        alert("Sign up failed!");
      }
    } catch (error) {
      alert("Sign up failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper">
      <form action="" id="form " onSubmit={handleSubmit}>
        <h1>Ready for a new adventure?</h1>
        <div className="input-box">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-box">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-box">
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="select-role">
          <select
            className="select-box"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose your role
            </option>
            <option value="author">Author</option>
            <option value="reviewer">Reviewer</option>
            <option value="organizer">Organizer</option>
          </select>
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
          <i className="bx bx-lock"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            id="repassword"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <i className="bx bx-lock"></i>
        </div>
        <button className="btn">Sign Up</button>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => {
                Navigate("/login");
                window.location.reload();
              }}
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
