import React, { useState, useEffect } from "react";
import "./Articles.css";
import CardArticle from "../CardArticle/CardArticle";

function Articles() {
  const USER_URL = "http://localhost:8080/user"
  const SERVER_URL = "http://localhost:8080/article";

  const CONFERENCES_URL = "http://localhost:8080/conference";

  let articleSpan = "Articles";

  const [articles, setArticles] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [conferences, setConferences] = useState([]);
  const [conferenceId, setConferenceId] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, articleId: null });

  const [selectedConference, setSelectedConference] = useState(null);

  const handleConferenceChange = (e) => {
    const confId = e.target.value;
    setSelectedConference(confId);
    setConferenceId(confId); 


  };

  useEffect(() => {
    if (conferenceId) {
      setArticles([]); // Resetează articolele imediat ce conferința se schimbă
      fetch(`${SERVER_URL}/search/conference/${conferenceId}`)
        .then((response) => {
          if (!response.ok) {
            setArticles([]); 
            throw new Error(`Failed to fetch articles: ${response.statusText}`);
          }
          return response.json();
        })
        .then(async (data) => {
          const articlesWithAuthors = await Promise.all(
            data.identifiedArt.map(async (article) => {
              const authorResponse = await fetch(`${USER_URL}/${article.authorId}`);
              const authorData = await authorResponse.json();
              return {
                ...article,
                authorName: `${authorData.user.firstName} ${authorData.user.lastName}`,
              };
            })
          );
          setArticles(articlesWithAuthors);
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
      articleSpan = "Articles of the";
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

    // if the user is an organizer, fetch the authors
    if(role === "author"){
      const authorId = localStorage.getItem("userId");
      if (authorId !== null){
        fetch(`${SERVER_URL}/search/author/${authorId}`)
          .then((response) => response.json())
          .then((data) => setArticles(data.identifiedArt))
          .catch((error) =>
            console.error("Error fetching articles for the author:", error)
          );

          fetch(`${USER_URL}/${authorId}`)
          .then((response) => response.json())
          .then((data) => setAuthorName(data.user.firstName + " " + data.user.lastName))
          .catch((error) =>
            console.error("Error fetching name for the author:", error)
          );
      }
      

    }else {
      console.error("Author Id is missing in the localStorage");
    }
  }, []);

  const handleContextMenu = (event, articleId) => {
    event.preventDefault();
    if (userRole === "author") {
      setContextMenu({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        articleId: articleId,
      });
    }
  };

  const handleDeleteArticle = (articleId) => {
    fetch(`${SERVER_URL}/${articleId}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete article");
        }
        // update article list
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleId)
        );
        setContextMenu({ visible: false, x: 0, y: 0, articleId: null });
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, articleId: null });
  };

  return (
    <>
      <div className="article-title">
        <span> {articleSpan} </span>
        {userRole === "author" && (
          <button className="btn add-btn">Add Article</button>
        )}
        {userRole === "organizer" && (
          <div className="conference-title">
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
            <div
              key={article.id}
              onContextMenu={(event) => handleContextMenu(event, article.id)}
              className="article-item"
            >
            <CardArticle
                id={article.id}
                title={article.title}
                author={authorName? authorName : article.authorName}
                description={article.description}
                status={article.status}
              />
            </div>
          ))
        ) : (
          <p>No articles available for this conference.</p>
        )}
        </div>
      </div>

      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}>
          <button
            onClick={() => handleDeleteArticle(contextMenu.articleId)}
            className="delete-btn"
          >
            Delete Article
          </button>
          <button onClick={handleCloseContextMenu} className="close-btn">
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default Articles;
