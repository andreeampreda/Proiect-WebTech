import React from "react";
import "./CardArticle.css";

function CardArticle({ title, description, id, status }) {
  return (
    <div className="author-card">
      <div className="author-up">
        <i className="fas fa-user-circle"></i>
        <h2>{title}</h2>
        <h2>{description}</h2>
      </div>
      <div className="author-info">
        <p>Author Bio</p>
      </div>
    </div>
  );
}

export default CardArticle;
