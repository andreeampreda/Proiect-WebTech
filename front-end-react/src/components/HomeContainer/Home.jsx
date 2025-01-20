import React,{useState, useEffect} from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify.jsx";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role=localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conference/organizer";
  const SERVER_URL = "http://localhost:8080/article";
  const CONF_MANG_URL="http://localhost:8080/confManagement/conference"
  

  const [conferences, setConferences] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  
  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];

  const fetchLatestArticlesAndAuthors = async (conferences) => {
    console.log("Fetching articles and authors for conferences:", conferences);
  
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
    const articlesAndAuthorsPromises = conferences.map(async (conference) => {
      console.log("Fetching data for conference:", conference.id);
  
      // Fetch articolele
      const articlesData = await fetch(`${SERVER_URL}/search/conference/${conference.id}`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Error fetching articles for conference ${conference.id}`);
            throw new Error(`Failed to fetch articles for ${conference.id}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          return { identifiedArt: [] };
        });
  
      console.log(`Articles fetched for conference ${conference.id}:`, articlesData);
  
      const filteredArticles = (articlesData.identifiedArt || []).filter((article) => {
        const createdAt = new Date(article.createdAt);
        const updatedAt = new Date(article.updatedAt);
        return (
          (createdAt.getTime() === updatedAt.getTime() && createdAt > oneDayAgo) ||
          updatedAt > oneDayAgo
        );
      });
  
      console.log(`Filtered articles for conference ${conference.id}:`, filteredArticles);
  
      const sortedArticles = filteredArticles.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
  
      // Fetch autorii în pending
      const pendingAuthorsData = await fetch(`${CONF_MANG_URL}/${conference.id}/pending-authors`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Error fetching pending authors for conference ${conference.id}`);
            throw new Error(`Failed to fetch pending authors for ${conference.id}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching pending authors:", error);
          return { pendingAuthors: [] };
        });
  
      console.log(`Pending authors for conference ${conference.id}:`, pendingAuthorsData);
  
      return {
        conferenceId: conference.id,
        articles: sortedArticles,
        pendingAuthors: pendingAuthorsData.pendingAuthors || [],
      };
    });
  
    const results = await Promise.all(articlesAndAuthorsPromises);
  
    console.log("Fetched articles and authors results:", results);
  
    setLatestArticles(
      results.filter(
        (item) => item.articles.length > 0 || item.pendingAuthors.length > 0
      )
    );
  
    console.log("Updated latestArticles state:", results);
  };

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
        console.log("LatestArticles state changed:", latestArticles);
      }, [latestArticles]);

      
      useEffect(() => {
        if (conferences.length > 0) {
          fetchLatestArticlesAndAuthors(conferences);
          console.log("After fetchLatestArticlesAndAuthors, latestArticles:", latestArticles);
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

                if (!conference) {
                  console.warn("Conference not found for item:", item);
                  return null;
                }

                console.log("Rendering notifications for conference:", conference.name);

                return (
                  <div key={item.conferenceId} className="conference-section">
                    <h3>{conference.name}</h3>

                    {item.articles.map((article) => {
                      console.log("Rendering Article Card:", {
                        title: `Conference: ${conference.name}`,
                        description: `Article: ${article.title}`,
                      });

                      return (
                        <CardNotify
                          key={`article-${article.id}`}
                          title={`Conference: ${conference.name}`}
                          description={`Article: ${article.title}`}
                        />
                      );
                    })}

                    {item.pendingAuthors.map((author) => {
                      console.log("Rendering Author Card:", {
                        title: `Conference: ${conference.name}`,
                        description: `New Author: ${author.firstName} ${author.lastName}`,
                      });

                      return (
                        <CardNotify
                          key={`author-${author.authorId}`}
                          title={`Conference: ${conference.name}`}
                          description={`New Author: ${author.firstName} ${author.lastName}`}
                        />
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <p>You do not have new notifications.</p>
            )}


            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
