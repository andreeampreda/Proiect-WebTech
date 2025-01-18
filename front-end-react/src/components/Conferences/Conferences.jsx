import React from "react";
import "./Conferences.css";
import { useState, useEffect } from "react";
import CardConference from "../CardConference/CardConference";
import ConferenceContent from "../ConferenceContent/ConferenceContent";

//Conferences Page components

function Conferences() {
  const conferenceSpan = "All conferences";
  const SERVER_URL = "http://localhost:8080/conference";

  const [conferences, setConferences] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_URL}`)
      .then((response) => response.json())
      .then((data) => setConferences(data.conferences))
      .catch((error) => {
        console.log("Couldn't fetch conferences");
      });
  }, []);

  const handleConferenceClick = (conference) => {
    console.log("click", conference);
    setSelectedConference(conference);
    setIsContentOpen(true);
    console.log(isContentOpen);
  };

  const handleCloseContent = () => {
    setIsContentOpen(false);
  };

  return (
    <div className="conferencePage">
      <span className="title">{conferenceSpan}</span>
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
    </div>
  );
}

export default Conferences;
