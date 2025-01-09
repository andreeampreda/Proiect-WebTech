import React from "react";
import "./CardArticle.css";

function CardArticle({ title, description, author }) {
  const imageUrl = "/images/cards";

  const number = Math.floor(Math.random() * 9) + 1;

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
