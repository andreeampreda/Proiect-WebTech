import React, { useState, useEffect } from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify.jsx";
import AddArticle from "../AddArticle/AddArticle";
import { Modal, Box } from "@mui/material";


function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role = localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conference/organizer";
  const SERVER_URL = "http://localhost:8080/article";

  const [conferences, setConferences] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);


  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];

  const handleOpenModal = (articleId) => {
    console.log("Opening modal for article ID:", articleId); // Log pentru verificare
    setSelectedArticleId(articleId); // Setează ID-ul articolului selectat
    setIsModalOpen(true); // Deschide modalul
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSelectedArticleId(null); // Resetează ID-ul articolului selectat
  };
  
  
  const fetchLatestArticlesAndAuthors = async (conferences) => {
    console.log("Fetching articles and authors for conferences:", conferences);

    const articlesAndAuthorsPromises = conferences.map(async (conference) => {
      try {
        const articlesData = await fetch(
          `${SERVER_URL}/search/conference/${conference.id}`
        ).then((response) => response.json());

        const articles = articlesData.identifiedArt || [];
        return articles.map((article) => ({
          conferenceName: conference.name,
          articleTitle: article.title,
          authorName: `${article.authorFirstName} ${article.authorLastName}`,
        }));
      } catch (error) {
        console.error(
          `Error fetching articles for conference ${conference.id}:`,
          error
        );
        return [];
      }
    });

    const results = await Promise.all(articlesAndAuthorsPromises);
    setLatestArticles(results.flat());
  };

  const fetchReviewsByAuthor = async () => {
    const authorId = localStorage.getItem("userId");
    console.log("Fetching reviews for authorId:", authorId);

    try {
      const response = await fetch(`${SERVER_URL}/author/${authorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews for author");
      }
      const data = await response.json();
      console.log("Full API response:", data);

      if (Array.isArray(data) && data.length > 0) {
        const sortedReviews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestReviews(sortedReviews);
      } else {
        console.warn("No valid reviews found in response:", data);
        setLatestReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews for author:", error);
      setLatestReviews([]);
    }
  };

  useEffect(() => {
    if (role === "organizer") {
      const organizerId = localStorage.getItem("userId");
      fetch(`${CONFERENCES_URL}/${organizerId}`)
        .then((response) => response.json())
        .then((data) => setConferences(data.conferences || []))
        .catch((error) =>
          console.error("Error fetching conferences:", error)
        );
    }
  }, [role]);

  useEffect(() => {
    if (role === "organizer" && conferences.length > 0) {
      fetchLatestArticlesAndAuthors(conferences);
    } else if (role === "author") {
      fetchReviewsByAuthor();
    }
  }, [role, conferences]);

  const i = Math.floor(Math.random() * welcomeTexts.length);

  return (
    <div className="home-container">
      <h1>Welcome, {username}</h1>
      <h2>{welcomeTexts[i]}</h2>
      <div className="home-content ">
        <img className="home-img" src="/images/home-image3.png" alt="home" />
        <div className="conferences-container">
          <h1>Notification</h1>
          <div className="notify-list">
          <div className="notify-list">
  {role === "author" && latestReviews.length > 0 ? (
    latestReviews.map((review) => (
      <CardNotify
        key={`review-${review.reviewId}`}
        title={`${review.articleTitle}`}
        description={`Comment: ${review.comment}`}
        role={role}
        onOpenModal={() => handleOpenModal(review.articleId)} // Transmite funcția și id-ul articolului
      />
    ))
  ) : role === "author" ? (
    <p>No reviews found for this author.</p>
  ) : null}

  {role === "organizer" && latestArticles.length > 0 ? (
    latestArticles.map((item, index) => (
      <CardNotify
        key={`article-${index}`}
        title={`Conference: ${item.conferenceName}`}
        description={`Article: ${item.articleTitle} by ${item.authorName}`}
        role={role}
      />
    ))
  ) : role === "organizer" ? (
    <p>No articles found for conferences.</p>
  ) : null}

  {/* Randarea modalului în afara buclei map */}
  {isModalOpen && (
    <AddArticle
      open={isModalOpen}
      onClose={handleCloseModal}
      authorId={localStorage.getItem("userId")}
      articleId={selectedArticleId}
    />
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
