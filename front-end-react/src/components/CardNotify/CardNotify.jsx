import React from "react";
import "./CardNotify.css";

function CardNotify({ title, description,}) {
  

  return (
    <div className="notify-card">
      <div className="notify-content">
        <span className="notify-title">{title}</span>
        <p className="notify-description">{description}</p>
        
      </div>
    </div>
  );
}

export default CardNotify;
