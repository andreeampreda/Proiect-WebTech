import React from "react";
import "./CardConference.css";
import { useState, useEffect } from "react";

//Card for Conference Object

function CardConference({ conference, onClick }) {
  const date = new Date(conference.date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Obținem luna (abreviată)

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.role;
    setUserRole(role);
  }, []);

  return (
    <div className="conference-card" onClick={onClick}>
      <div className="date-info">
        <div className="day">{day}</div>
        <div className="month">{month}</div>
      </div>
      <div className="name-location">
        <span id="name">{conference.name}</span>
        <span id="location">{conference.location}</span>
      </div>
      <div className="see-info">
        {userRole === "author" && <button className="joinBtn">Join now</button>}
      </div>
    </div>
  );
}

export default CardConference;
