import React from "react";
import "./CardAuthor.css";

function CardAuthor({ id, firstName, lastName, username }) {
  return (
    <div className="author-card">
      <div className="user-content">
        <i className="fas fa-user-circle"></i>
        <div className="user-info">
          <span>
            {firstName} {lastName}
            {"  "}
          </span>
          <span id="username">@{username}</span>
          <p>Articles Written: infinite??</p>
        </div>
        <div className="ud-buttons">
          <button className="btn update">Update</button>
          <button className="btn delete">X</button>
        </div>
      </div>
    </div>
  );
}

export default CardAuthor;
