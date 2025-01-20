import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import "./ArticleContent.css";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

function ArticleContent() {
  const ARTICLE_URL = "http://localhost:8080/article";
  const STATUS_URL = "http://localhost:8080/review/status/";
  const USER_URL = "http://localhost:8080/user";
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`${STATUS_URL}${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        setStatus(data.status);
      })
      .catch((error) => {
        console.error("Error fetching article status:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${ARTICLE_URL}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setArticle(data.article);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
    setUserId(localStorage.getItem("userId"));
    console.log(userRole);
  }, [userRole]);

  useEffect(() => {
    if (article && article.authorId) {
      fetch(`${USER_URL}/${article.authorId}`)
        .then((response) => response.json())
        .then((authorData) => {
          setAuthorName(
            `${authorData.user.firstName} ${authorData.user.lastName}`
          );
        })
        .catch((error) => console.error("Error fetching author:", error));
    }
  }, [article]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" color="error">
          Article not found!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        margin: "20px auto",
        maxWidth: "800px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "gray", marginBottom: "10px" }}
        >
          By {authorName || "Unknown Author"}
        </Typography>

        <div className="status-div" style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              display: "block", // pentru a-l pune pe o linie separată
            }}
          >
            Status:
          </label>
          <Typography
            className="status-text"
            variant="body1"
            sx={{ fontWeight: "bold" }}
          >
            {status ? status : "No status available"}
          </Typography>
        </div>

        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          {article.description}
        </Typography>

        <Typography variant="body2">{article.content}</Typography>
        <div className="article-bottom">
          {userRole === "reviewer" && (
            <button className="submitBtn" onClick={handleOpenModal}>
              Give FeedBack
            </button>
          )}
        </div>
        {isModalOpen && (
          <FeedbackModal
            articleId={article.id}
            onClose={handleCloseModal}
            reviewerId={userId}
          ></FeedbackModal>
        )}
      </Paper>
    </Box>
  );
}

export default ArticleContent;
