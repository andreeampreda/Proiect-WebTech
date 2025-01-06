import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <NavBar />
      <div className="content-about">
        <h1>Acest proiect a fost realizat de</h1>
        <h2> Popoiu Daria - Pichermayer Ruxandra -</h2>
        <h2> Preda Andreea</h2>
        <p>@ 2024 Zuzele-CO</p>
      </div>
      <img src="public/images/zuzele.png" className="us image"></img>
    </div>
  );
}

export default About;
