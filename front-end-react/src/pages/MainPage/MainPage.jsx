import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./MainPage.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="main-page">
      <NavBar />
      <div className="content-main">
        <h1>Where science</h1>
        <h1> meets innovation</h1>
        <p>
          An innovative platform for organizing scientific conferences,
          simplifying article submission and management.
        </p>
        <Link to="/signup" className="btn signup">
          Sign Up Now
        </Link>
      </div>
      <img src="public/images/home-image2.png" className="main image"></img>
    </div>
  );
}

export default MainPage;
