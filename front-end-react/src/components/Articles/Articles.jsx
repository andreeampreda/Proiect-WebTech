import React, { useState, useEffect } from "react";
import "./Articles.css";
import CardArticle from "../CardArticle/CardArticle";

function Articles() {
  const SERVER_URL = "http://localhost:8080/article";

  const [articles, setArticles] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetch(`${SERVER_URL}`)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching articles:", error));

    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  return (
    <>
      <div className="article title">
        <span>Articles</span>
        {userRole === "author" && (
          <button className="btn add-btn">Add Article</button>
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
