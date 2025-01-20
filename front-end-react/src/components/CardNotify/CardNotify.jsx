import React from "react";
import "./CardNotify.css";

function CardNotify({ title, description, role, onOpenModal, onAccept, onReject }) {
  console.log("CardNotify props:", { title, description });

  const handleAccept = () => {
    console.log(`Accept button clicked for: ${description}`);
    if (onAccept) {
      onAccept(); // Apelează funcția transmisă pentru Accept
    }
  };

  const handleReject = () => {
    console.log(`Reject button clicked for: ${description}`);
    if (onReject) {
      onReject(); // Apelează funcția transmisă pentru Reject
    }
  };

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
            ? `New request for conference: ${title}`
            : role === "author"
            ? `New review for article: ${title}`
            : title}
        </span>

        {/* Afișare descriere */}
        <p className="notify-description">{description}</p>

        {/* Butoane pentru organizator */}
        {role === "organizer" && (
          <div className="notify-buttons">
            <button className="notify-acceptn button" onClick={onAccept}>
            <i className="bi bi-check-square"></i>
            </button>
            <button className="notify-reject button" onClick={onReject}>
            <i className="bi bi-x-square"></i>
            </button>
          </div>
        )}

        {/* Buton pentru autor */}
        {role === "author" && (
          <button className="notify-update button" onClick={handleUpdate}>
            <i className="bi bi-arrow-up-right-circle"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default CardNotify;
