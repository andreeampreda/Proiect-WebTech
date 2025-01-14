import React, { useState, useEffect } from "react";
import "./Articles.css";
import CardArticle from "../CardArticle/CardArticle";

function Articles() {
  const SERVER_URL = "http://localhost:8080/article";

  const CONFERENCES_URL = "http://localhost:8080/conference";

  const [articles, setArticles] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [conferences, setConferences] = useState([]);
  const [conferenceId, setConferenceId] = useState("");

  const [selectedConference, setSelectedConference] = useState(null);

  const handleConferenceChange = (e) => {
    const confId = e.target.value;
    setSelectedConference(confId);
    setConferenceId(confId); 

    if(conferenceId){
      fetch(`${SERVER_URL}/search/${conferenceId}`)
        .then((response) => response.json())
        .then((data) => setArticles(data.identifiedArt))
        .catch((error) =>
          console.error("Error fetching articles for the conference:", error),
          setArticles([])
      );
    }

  };

  useEffect(() => {
    // fetch articles
    // if (selectedConference) {
    //   fetch(`${CONFERENCES_URL}/${selectedConference}`)
    //     .then((response) => response.json())
    //     .then((data) => setArticles(data.articles))
    //     .catch((error) =>
    //       console.error("Error fetching articles for the conference:", error)
    //     );
    // }
    if (conferenceId) {
      setArticles([]); // Resetează articolele imediat ce conferința se schimbă
    
      fetch(`${SERVER_URL}/search/${conferenceId}`)
        .then((response) => {
          if (!response.ok) {
            setArticles([]); 
            throw new Error(`Failed to fetch articles: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setArticles(data.identifiedArt && data.identifiedArt.length > 0 ? data.identifiedArt : []);
        })
        .catch((error) => {
          console.error("Error fetching articles for the conference:", error);
          setArticles([]); 
        });
    }
    
  }, [selectedConference]);

  useEffect(() => {
    
    // fetch user role  
    const role = localStorage.getItem("role");
    setUserRole(role);

    // if the user is an organizer, fetch the conferences
    if(role === "organizer"){
      const organizerId = localStorage.getItem("userId");
      if (organizerId !== null){
      fetch(`${CONFERENCES_URL}/organizer/${organizerId}`)  
        .then((response) => response.json())
        .then((data) => setConferences(data.conferences))
        .catch((error) => console.error("Error fetching conferences:", error));
      }
    } else {
      console.error("Organizer Id is missing in the localStorage");
    }
  }, []);

  return (
    <>
      <div className="article title">
        <span>Articles of the </span>
        {userRole === "author" && (
          <button className="btn add-btn">Add Article</button>
        )}
        {userRole === "organizer" && (
          <div className="conference title">
            <span>Conference: </span>
            <select className="dropDown" value={selectedConference || ""} onChange={handleConferenceChange}>
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
        {articles.length > 0 ? (
          articles.map((article) => (
            <CardArticle
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              status={article.status}
            />
          ))
        ) : (
          <p>No articles available for this conference.</p>
        )}
        </div>
      </div>
    </>
  );
}

export default Articles;
