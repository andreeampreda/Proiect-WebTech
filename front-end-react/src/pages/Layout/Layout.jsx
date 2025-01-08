import React from "react";
import { Outlet } from "react-router-dom";
import NavHome from "../../components/NavHome/NavHome";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout-page">
      <NavHome />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
