import React from "react";
import "./Comment.css";

function Comment({ comment, firstName, lastName }) {
  return (
    <div className="comment-div">
      <p className="reviewer-username">@Anonymous </p>
      <p className="comment-text">"{comment}"</p>
    </div>
  );
}

export default Comment;
