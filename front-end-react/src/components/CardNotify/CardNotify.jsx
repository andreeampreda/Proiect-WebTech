import React,{ useState, useEffect } from "react";
import "./CardNotify.css";
import AddArticle from "../AddArticle/AddArticle";


function CardNotify({ title, description,role,onOpenModal}) {
  console.log("CardNotify props:", { title, description });
  
  const handleUpdate = () => {
    console.log(`Update button clicked for: ${description}`);
    if (onOpenModal) {
      onOpenModal(); // Apelează funcția transmisă din `Home`
    }
  };


  return (
    <div className="notify-card">
      <div className="notify-content">
      <span className="notify-title">
      {role === "organizer"
            ? `New article for conference: ${title}`
            : role === "author"
            ? `New review for article: ${title}`
            : title}
        </span>

        {/* Afișare descriere */}
        <p className="notify-description">{description}</p>

        {/* Buton pentru autor */}
        {role === "author" && (
          <button className="notify-update-button" onClick={handleUpdate}>
            <i className="bi bi-arrow-up-right-circle"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default CardNotify;
