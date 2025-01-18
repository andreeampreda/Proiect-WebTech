import React from "react";
import "./ConferenceContent.css";

// Conference Modal

function ConferenceContent({ conference, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          close (x)
        </button>
        <h3 id="title">{conference.name}</h3>
        <p>
          <strong>Location:</strong> {conference.location}
        </p>
        <p>
          <strong>Date:</strong> {conference.date}
        </p>
        <p>
          <strong>Description:</strong> {conference.description}
        </p>
      </div>
    </div>
  );
}

export default ConferenceContent;
