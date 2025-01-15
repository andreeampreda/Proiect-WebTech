import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardArticle.css";

function CardArticle({ id, title, description, author}) {
  const imageUrl = "/images/cards";

  const number = Math.floor(Math.random() * 9) + 1;
  // const handleArticleClick = (articleId) => {
  //   navigate(`/home/articles/${articleId}`);
  // };

  return (
    <div className="article-card">
      <div className="article-image">
        <img src={`/images/cards/${number}.jpg`} alt={title} />
      </div>
      <div className="article-content">
        <span className="article-title">{title}</span>
        <p className="article-author">By {author}</p>
        <p className="article-description">{description}</p>
      </div>
    </div>
  );
}

export default CardArticle;
