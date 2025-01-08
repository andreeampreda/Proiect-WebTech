import React from "react";
import "./CardAuthor.css";

function CardAuthor({ id, firstName, lastName }) {
  return (
    <div className="author-card">
      <div className="author-up">
        <i className="fas fa-user-circle"></i>
        <h2>{firstName}</h2>
        <h2>{lastName}</h2>
      </div>
      <div className="author-info">
        <p>Author Bio</p>
      </div>
    </div>
  );
}

export default CardAuthor;
