import React from "react";
import "./CardNotify.css";

function CardNotify({ title, description,}) {
  

  return (
    <div className="notify-card">
      <div className="notify-content">
        {/* in title vreau sa am titlul conferintei */}
        <span className="notify-title">New articole for {title}</span>
        {/* in description vreau sa am numele articolului sau numele noului autor care 
        participa la conferinta */}
        <p className="notify-description">{description}</p>
        
      </div>
    </div>
  );
}

export default CardNotify;
