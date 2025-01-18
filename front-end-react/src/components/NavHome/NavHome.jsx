import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavHome.css";
import { Button } from "../Button/Button";

function NavHome() {
  const parentRoute = "/home";

  return (
    <>
      <nav className="navhome">
        <div className="navhome-container">
          <Link to="/home" className="navhome-logo">
            <img src="/images/logo.png" alt="logo" />
          </Link>
          <div className="menu-iconn">
            <i className="fas fa-times"></i>
          </div>
          <ul className="nav-menu active">
            <li className="nav-item">
              <Link to="creators" className="navhome-links">
                Creators
              </Link>
            </li>
            <li>
              <Link to="articles" className="navhome-links">
                Articles
              </Link>
            </li>
            <li>
              <Link to="conferences" className="navhome-links">
                Conferences
              </Link>
            </li>
          </ul>
          <Button buttonStyle="btn--outline">Log out</Button>
        </div>
      </nav>
    </>
  );
}

export default NavHome;
