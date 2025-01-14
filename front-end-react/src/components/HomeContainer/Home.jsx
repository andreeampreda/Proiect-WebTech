import React,{useState, useEffect} from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role=localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conference/organizer";
  

  const [conferences, setConferences] = useState([]);
  
  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];

  useEffect(() => {
    setConferences([]);
    if (role === "organizer") {
  
        const organizerId = localStorage.getItem("userId");
        fetch(`${CONFERENCES_URL}/${organizerId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
          setConferences(data.conferences || [])})
          .catch((error) =>
            console.error("Error fetching conferences:", error)
          );
      };
  
    }, []);
  

  const i = Math.floor(Math.random() * welcomeTexts.length);

  return (
    <div className="home-container">
      <h1>Welcome, {username}</h1>
      <h2>{welcomeTexts[i]}</h2>
      <div className="home-content ">
        <img className="home-img" src="/images/home-image3.png" alt="home" />
        <div className="conferences-container">
          <h1>Notify Section</h1>
            <div className="notify-list">
             {conferences.length>0 ? (conferences.map((conferences)=>(
              <CardNotify
              title={'Noua ta conferinta '+conferences.name}
              description={conferences.location}
              />
             ))):(
              <p>No conference available conference.</p>
             )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
