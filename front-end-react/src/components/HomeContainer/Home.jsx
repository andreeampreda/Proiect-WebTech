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
  const ORGANIZER_AUTHORS_URL =
    "http://localhost:8080/conference/organizer-authors";

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
    }
  }, [role]);

  useEffect(() => {
    if (role === "organizer") {
      const interval = setInterval(() => {
        console.log("Fetching pending authors...");
        fetchPendingAuthors();
      }, 60000); // 300000ms = 5 minute

      // Curata intervalul la demontare
      return () => clearInterval(interval);
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
                  onOpenModal={() => handleOpenModal(review.articleId)} // Transmite funcția și id-ul articolului
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
                  onAccept={() =>
                    updateStatus(item.author.id, item.conference.id, "approved")
                  }
                  onReject={() =>
                    updateStatus(item.author.id, item.conference.id, "rejected")
                  }
                />
              ))
            ) : role === "organizer" ? (
              <p>No pending authors found for conferences.</p>
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
