import React, { useState, useEffect } from "react";
import "./Authors.css";
import CardAuthor from "../CardAuthor/CardAuthor";

function Authors() {
  const SERVER_URL = "http://localhost:8080/user";

  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    fetch(`${SERVER_URL}/authors`)
      .then((response) => response.json())
      .then((data) => setAuthors(data.users))
      .catch((error) => console.error("Error fetching authors:", error));

    console.log("heei");
  }, []);

  return (
    <>
      <div className="authors title">Authors</div>
      <div className="authors-container">
        <div className="authors-list">
          {authors.map((author) => (
            <CardAuthor
              id={author.id}
              firstName={author.firstName}
              lastName={author.lastName}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Authors;
