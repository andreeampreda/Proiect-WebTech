import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

function ArticleContent() {
  const ARTICLE_URL = "http://localhost:8080/article";
  const USER_URL = "http://localhost:8080/user";
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (article && article.authorId) {
      fetch(`${USER_URL}/${article.authorId}`)
        .then((response) => response.json())
        .then((authorData) => {
          setAuthorName(`${authorData.user.firstName} ${authorData.user.lastName}`);
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
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          {article.description}
        </Typography>
        <Typography variant="body2">{article.content}</Typography>
      </Paper>
    </Box>
  );
}

export default ArticleContent;
