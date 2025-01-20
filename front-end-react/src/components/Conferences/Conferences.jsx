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
  const CONFERENCE_URL = `http://localhost:8080/conference/organizer/`;
  const AUTHOR_URL = `http://localhost:8080/confManagement/conferences/`;
  const REVIEWER_URL = `http://localhost:8080/conference/reviewer/`;

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

  const fetchAllConferences = async () => {
    if (userRole === "reviewer") {
      console.log("pt ca e reviwer");
      const userId = localStorage.userId;

      const response = await fetch(`${REVIEWER_URL}${userId}`);
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} - Unable to fetch conferences`
        );
      }
      const data = await response.json();
      console.log(data);

      setConferences(data);

      // await fetch(`${REVIEWER_URL}${userId}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //     setConferences(data);
      //   })
      //   .catch((error) => {
      //     console.log("Couldn't fetch conferences");
      //   });
    } else if (userRole === "author" || userRole === "organizer") {
      try {
        const response = await fetch(`${SERVER_URL}`);
        if (!response.ok) {
          throw new Error(
            `Error: ${response.status} - Unable to fetch conferences`
          );
        }

        const data = await response.json();
        setConferences(data.conferences);
      } catch (error) {
        console.log("Couldn't fetch conferences", error);
      }
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    console.log("useEffect", role);

    if (userRole) {
      fetchAllConferences();
    }
  }, [userRole]);

  const handleOptionChange = (e) => {
    const userId = localStorage.userId;
    const selectedOption = e.target.value;

    if (selectedOption == "") {
      fetchAllConferences();
      console.log("toate conferinte;e");
    } else if (selectedOption === "user") {
      setConferences([]);

      if (userRole === "organizer") {
        fetch(`${CONFERENCE_URL}${userId}`)
          .then((response) => response.json())
          .then((data) => setConferences(data.conferences))
          .catch((error) => {
            console.log("Couldn't fetch conferences");
          });
      }

      if (userRole === "author") {
        fetch(`${AUTHOR_URL}${userId}`)
          .then((response) => response.json())
          .then((data) => setConferences(data)) ///!!!!!!!
          .catch((error) => {
            console.log("Couldn't fetch conferences");
          });
        console.log("autori autori");
      }
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
  };

  return (
    <div className="conferencePage">
      <div className="conferenceUpper">
        {userRole === "reviewer" && (
          <>
            <span className="title">Assigned Conferences</span>
          </>
        )}

        {userRole === "organizer" ||
          (userRole === "author" && (
            <>
              <span className="title">{conferenceSpan}</span>
              <select className="dropDown" onChange={handleOptionChange}>
                <option value="">All</option>
                <option value="user">Only yours</option>
              </select>
            </>
          ))}
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
