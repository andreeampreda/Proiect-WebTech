import React,{useState, useEffect} from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role=localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conference/organizer";
  const SERVER_URL = "http://localhost:8080/article";
  

  const [conferences, setConferences] = useState([]);
  // const [articles, setArticles] = useState([]);
  // const [conferenceId, setConferenceId] = useState("");
  const [latestArticles, setLatestArticles] = useState([]);
  
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
          setConferences(data.conferences || [] )})
          .catch((error) =>
            console.error("Error fetching conferences:", error)
          );
      };
  
    }, []);
  
    useEffect(() => {
      if (conferences.length > 0) {
        const fetchLatestArticles = async () => {
          const articlesPromises = conferences.map((conference) =>
            fetch(`${SERVER_URL}/search/${conference.id}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch articles for ${conference.id}`);
                }
                return response.json();
              })
              .then((data) => {
                const sortedArticles = (data.identifiedArt || []).sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                return {
                  conferenceId: conference.id,
                  article: sortedArticles[0] || null,
                };
              })
              .catch((error) => {
                console.error("Error fetching articles:", error);
                return { conferenceId: conference.id, article: null };
              })
          );
  
          const results = await Promise.all(articlesPromises);
          setLatestArticles(results.filter((item) => item.article !==null));
        };
  
        fetchLatestArticles();
      }
    }, [conferences]);
    

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
            {latestArticles.length > 0 ? (
              latestArticles.map((item) => {
                const conference = conferences.find(
                  (conf) => conf.id === item.conferenceId
                );
                return (
                  <div key={item.conferenceId} className="conference-section">
                    <CardNotify
                      title={conference.name}
                      description={item.article.title}
                    />
                  </div>
                );
              })
            ) : (
              <p>No conferences with articles available.</p>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
