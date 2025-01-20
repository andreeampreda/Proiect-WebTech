import React from "react";
import "./CardNotify.css";


function CardNotify({ title, description,role}) {
  console.log("CardNotify props:", { title, description });
  
  const handleUpdate = () => {
    console.log(`Update button clicked for: ${description}`);
  }


  return (
    <div className="notify-card">
      <div className="notify-content">
      <span className="notify-title">
      {role === "organizer"
            ? `New Article for conference: ${title}`
            : role === "author"
            ? `New Review for article: ${title}`
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
