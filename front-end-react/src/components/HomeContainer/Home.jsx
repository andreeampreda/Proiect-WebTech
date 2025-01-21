import React, { useState, useEffect } from "react";
import "./Home.css";
import CardNotify from "../CardNotify/CardNotify.jsx";
import AddArticle from "../AddArticle/AddArticle";

function Home() {
  const username = localStorage.getItem("firstName") || "Guest";
  const role = localStorage.getItem("role") || "author";

  const CONFERENCES_URL = "http://localhost:8080/conference/organizer";
  const SERVER_URL = "http://localhost:8080/article";
  const ORGANIZER_AUTHORS_URL = "http://localhost:8080/conference/organizer-authors";


  const [conferences, setConferences] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [pendingAuthors, setPendingAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const welcomeTexts = [
    "Any big plans for today?",
    "What would you like to do today?",
    "Feeling creative?",
  ];


  const fetchPendingArticlesForReviewer = async () => {
    const reviewerId = localStorage.getItem("userId");
  
    if (!reviewerId) {
      console.error("Reviewer ID is missing.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/review/pending/${reviewerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pending articles for reviewer.");
      }
  
      const data = await response.json();
      console.log("Full API response:", data);
  
      // Accesează proprietatea `articles` din răspuns
      if (data.articles && Array.isArray(data.articles)) {
        setLatestReviews(data.articles);
        console.log("Pending articles for reviewer:", data.articles);
      } else {
        console.warn("Unexpected response format:", data);
        setLatestReviews([]); // Resetează lista dacă răspunsul nu este valid
      }
    } catch (error) {
      console.error("Error fetching pending articles for reviewer:", error);
    }
  };
  


  const handleOpenModal = (articleId) => {
    console.log("Opening modal for article ID:", articleId);
    setSelectedArticleId(articleId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSelectedArticleId(null);
  };

  const updateStatus = async (authorId, conferenceId, status) => {
    try {
      console.log("Sending request:", { authorId, conferenceId, status });

      const response = await fetch(
        "http://localhost:8080/confManagement/update-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authorId, conferenceId, status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      console.log(`Status updated to '${status}' successfully.`);

      // Reîncarcă lista de notificări
      fetchPendingAuthors();
    } catch (error) {
      console.error(`Error updating status to '${status}':`, error);
    }
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


  const fetchPendingAuthors = async () => {
    const organizerId = localStorage.getItem("userId");
    if (!organizerId) {
      console.error("Organizer ID is missing.");
      return;
    }

    try {
      const response = await fetch(`${ORGANIZER_AUTHORS_URL}/${organizerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pending authors.");
      }

      const data = await response.json();
      console.log("Pending authors:", data);
      setPendingAuthors(data);
    } catch (error) {
      console.error("Error fetching pending authors:", error);
    }
  };

  useEffect(() => {
    if (role === "organizer") {
      const organizerId = localStorage.getItem("userId");
      fetch(`${CONFERENCES_URL}/${organizerId}`)
        .then((response) => response.json())
        .then((data) => setConferences(data.conferences || []))
        .catch((error) => console.error("Error fetching conferences:", error));
      fetchPendingAuthors();
    } else if (role === "reviewer") {
      fetchPendingArticlesForReviewer();
    }
  }, [role]);


  useEffect(() => {
    if (role === "author") {
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
            {role === "author" && latestReviews.length > 0 ? (
              latestReviews.map((review) => (
                <CardNotify
                  key={`review-${review.reviewId}`}
                  title={`${review.articleTitle}`}
                  description={`Comment: ${review.comment}`}
                  role={role}
                  onOpenModal={() => handleOpenModal(review.articleId)}
                />
              ))
            ) : role === "author" ? (
              <p>No reviews found for this author.</p>
            ) : null}

            {role === "organizer" && pendingAuthors.length > 0 ? (
              pendingAuthors.map((item, index) => (
                <CardNotify
                  key={`pending-author-${index}`}
                  title={`Conference: ${item.conference.name}`}
                  description={`Author: ${item.author.firstName} ${item.author.lastName}`}
                  role={role}

                  onAccept={() => updateStatus(item.author.id, item.conference.id, "approved")}
                  onReject={() => updateStatus(item.author.id, item.conference.id, "rejected")}

                />
              ))
            ) : role === "organizer" ? (
              <p>No pending authors found for conferences.</p>
            ) : null}

            {role === "reviewer" && latestReviews.length > 0 ? (
              latestReviews.map((review) => (
                <CardNotify
                  key={`review-${review.reviewId}`}
                  title={`Article: ${review.articleTitle}`}
                  description={`Description: ${review.articleDescription}`}
                  role={role}
                  onOpenModal={() => console.log(`Opening article ${review.articleId}`)}
                />
              ))
            ) : role === "reviewer" ? (
              <p>No pending articles found for review.</p>
            ) : null}

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
  );
}

export default Home;
