import React, { useState, useEffect } from "react";
import "./Articles.css";
import CardArticle from "../CardArticle/CardArticle";

function Articles() {
  const SERVER_URL = "http://localhost:8080/article";
  const CONFERENCES_URL = "http://localhost:8080/conferences/organizer";

  const [articles, setArticles] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [conferences, setConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState("");

  useEffect(() => {
    // fetch articles
    fetch(`${SERVER_URL}`)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching articles:", error));

    // fetch user role  
    const role = localStorage.getItem("role");
    setUserRole(role);

    // if the user is an organizer, fetch the conferences
    if(role === "organizer"){
      const organizerId = localStorage.getItem("userId");
      fetch(`${CONFERENCES_URL}/${organizerId}`)  
        .then((response) => response.json())
        .then((data) => setConferences(data.conferences))
        .catch((error) => console.error("Error fetching conferences:", error));
    }

    const handleConferenceChange = (e) => {
      setSelectedConference(e.target.value); 
    };

  }, []);

  return (
    <>
      <div className="article title">
        <span>Articles</span>
        {userRole === "author" && (
          <button className="btn add-btn">Add Article</button>
        )}
        {userRole === "organizer" && (
          <div className="authors title">
            <span>Conference: </span>
            <select className="dropDown" value={selectedConference} onChange={handleConferenceChange}>
            {conferences.length > 0 ? (
                conferences.map((conference) => (
                  <option key={conference.id} value={conference.id}>
                    {conference.name}
                  </option>
                ))
              ) : (
                <option value="">No conferences available</option>
              )}
            </select>
          </div>
        )}
      </div>
      <div className="article-container">
        <div className="article-list">
          {articles.map((article) => (
            <CardArticle
              id={article.id}
              title={article.title}
              description={article.description}
              status={article.status}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Articles;
