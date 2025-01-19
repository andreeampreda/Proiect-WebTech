import React from "react";
import "./CardConference.css";
import { useState, useEffect } from "react";

//Card for Conference Object

function CardConference({ conference, onClick }) {
  const CREATE_URL = `http://localhost:8080/confManagement`;
  const SEARCH_URL = `http://localhost:8080/confManagement/conferences/`;

  const date = new Date(conference.date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  const [isJoined, setIsJoined] = useState("");
  const [userRole, setUserRole] = useState(false);

  const addAuthor = async () => {
    const authId = localStorage.getItem("userId");
    const confId = conference.id;
    const confName = conference.name;

    const authorToAdd = {
      confId: confId,
      authorId: authId,
    };

    if (!isJoined) {
      try {
        const response = await fetch(`${CREATE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authorToAdd),
        });

        if (response.ok) {
          console.log(authId + " joined conf " + confId);
          alert("Just joined " + confName + " conference!");
          setIsJoined(true);
        }
      } catch (error) {
        console.error("Failed to join author to conference", error);
        alert("An error occurred while adding the author.");
      }
    }
  };

  useEffect(() => {
    const role = localStorage.role;
    setUserRole(role);
  }, []);

  useEffect(() => {
    const authId = localStorage.getItem("userId");
    const confId = conference.id;

    const checkIfJoined = async () => {
      try {
        const response = await fetch(`${SEARCH_URL}${authId}`);
        const data = await response.json();
        const isAlreadyJoined = data.some((conf) => conf.id === conference.id);

        if (isAlreadyJoined) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    checkIfJoined();
  }, [conference.id]);

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
        {userRole === "author" && (
          <button className="joinBtn" onClick={addAuthor} disabled={isJoined}>
            {isJoined ? "Already joined" : "Join Now"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CardConference;
