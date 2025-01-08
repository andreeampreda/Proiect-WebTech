import React from "react";
import "./Home.css";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";

  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];

  const i = Math.floor(Math.random() * welcomeTexts.length);

  return (
    <div className="home-container">
      <h1>Welcome, {username}</h1>
      <h2>{welcomeTexts[i]}</h2>
      <div className="home-content ">
        <img className="home-img" src="/images/home-image3.png" alt="home" />
        <div className="conferences-container">aici ??</div>
      </div>
    </div>
  );
}

export default Home;
