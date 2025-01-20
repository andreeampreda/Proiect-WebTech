import React from "react";
import "./Conferences.css";
import { useState, useEffect } from "react";
import CardConference from "../CardConference/CardConference";
import ConferenceContent from "../ConferenceContent/ConferenceContent";
import AddConference from "../AddConference/AddConference";

//Conferences Page components

function Conferences() {
  const conferenceSpan = "View:";
  const SERVER_URL = "http://localhost:8080/conference";
  const CONFERENCE_URL = `http://localhost:8080/confManagement/conferences/`;

  const [conferences, setConferences] = useState([]);
  const [userConferences, setUserConferences] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchAllConferences = () => {
    fetch(`${SERVER_URL}`)
      .then((response) => response.json())
      .then((data) => setConferences(data.conferences))
      .catch((error) => {
        console.log("Couldn't fetch conferences");
      });
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    fetchAllConferences();
  }, []);

  const handleOptionChange = (e) => {
    const userId = localStorage.userId;
    const selectedOption = e.target.value;

    if (selectedOption == "") {
      fetchAllConferences();
      console.log("toate conferinte;e");
    } else if (selectedOption === "user") {
      setConferences([]);

      fetch(`${CONFERENCE_URL}${userId}`)
        .then((response) => response.json())
        .then((data) => setUserConferences(data)) ///!!!!!!!
        .catch((error) => {
          console.log("Couldn't fetch conferences");
        });
      console.log("doar ale mele");
    }
  };

  const handleConferenceClick = (conference) => {
    console.log("click", conference);
    setSelectedConference(conference);
    setIsContentOpen(true);
    console.log(isContentOpen);
  };

  const handleCloseContent = () => {
    setIsContentOpen(false);
    fetchAllConferences();
  };

  return (
    <div className="conferencePage">
      <div className="conferenceUpper">
        <span className="title">{conferenceSpan}</span>
        <select className="dropDown" onChange={handleOptionChange}>
          <option value="">All</option>
          <option value="user">Only yours</option>
        </select>
        {userRole === "organizer" && (
          <button onClick={handleOpenModal}>Add new Conference</button>
        )}
      </div>
      <div className="conferenceContainer">
        {conferences.length > 0 ? (
          conferences.map((conference) => (
            <CardConference
              key={conference.id}
              conference={conference}
              onClick={() => handleConferenceClick(conference)}
            ></CardConference>
          ))
        ) : (
          <p value="">No conferences available</p>
        )}
      </div>
      <div>
        {isContentOpen && selectedConference && (
          <ConferenceContent
            conference={selectedConference}
            onClose={handleCloseContent}
          ></ConferenceContent>
        )}
      </div>
      {isModalOpen && (
        <AddConference
          onClose={handleCloseModal}
          authorId={localStorage.getItem("userId")}
        />
      )}
    </div>
  );
}

export default Conferences;
