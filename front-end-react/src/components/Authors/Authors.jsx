import React, { useState, useEffect } from "react";
import "./Authors.css";
import CardAuthor from "../CardAuthor/CardAuthor";

function Authors() {
  const SERVER_URL = "http://localhost:8080/user";

  const [authors, setAuthors] = useState([]);

  const [role, setRole] = useState(
    localStorage.getItem("selectedRole") || "Authors"
  );

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    localStorage.setItem("selectedRole", selectedRole);
  };

  const route = role.toLowerCase();

  useEffect(() => {
    fetch(`${SERVER_URL}/${route}`)
      .then((response) => response.json())
      .then((data) => setAuthors(data.users))
      .catch((error) => console.error("Error fetching authors:", error));

    console.log("heei");
  }, [role]);

  return (
    <>
      <div className="authors title">
        <span>You selected: </span>
        <select className="dropDown" value={role} onChange={handleChange}>
          <option value="Authors">Authors</option>
          <option value="Organizers">Organizers</option>
          <option value="Reviewers">Reviewers</option>
        </select>
      </div>
      <div className="authors-container">
        <div className="authors-list">
          {authors.map((author) => (
            <CardAuthor
              id={author.id}
              firstName={author.firstName}
              lastName={author.lastName}
              username={author.username}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Authors;
