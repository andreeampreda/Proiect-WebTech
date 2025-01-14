import React,{useState, useEffect} from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role=localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conferences/organizer";
  const ARTICLES_URL = "http://localhost:8080/articles/author";

  const [userRole, setUserRole] = useState("");
  const [conferences, setConferences] = useState([]);
  const [articles, setArticles] = useState([]);

  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];

  useEffect(() => {
    if (role === "organizer") {
      const fetchConferences = () => {
        const organizerId = localStorage.getItem("userId");
        fetch(`${CONFERENCES_URL}/${organizerId}`)
          .then((response) => response.json())
          .then((data) => setConferences(data.conferences || []))
          .catch((error) =>
            console.error("Error fetching conferences:", error)
          );
      };
  
      fetchConferences();
  
      const intervalId = setInterval(fetchConferences, 10000);
  
      return () => clearInterval(intervalId);
    } else if (role === "author") {
      const authorId = localStorage.getItem("userId");
      fetch(`${ARTICLES_URL}/${authorId}`)
        .then((response) => response.json())
        .then((data) => setArticles(data.articles || []))
        .catch((error) =>
          console.error("Error fetching articles:", error)
        );
      }
  }, [role]);
  

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
            
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
