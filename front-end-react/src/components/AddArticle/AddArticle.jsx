import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";

function AddArticle({ open, onClose, authorId, articleId = 0}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedConference, setSelectedConference] = useState("");
  const [availableConferences, setAvailableConferences] = useState([]); 
  const [version, setVersion] = useState(1);

  useEffect(() => {

    if (articleId !== 0) {
      fetch(`http://localhost:8080/article/${articleId}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.article.title); 
          setDescription(data.article.description);
          setContent(data.article.content );
          setSelectedConference(data.article.conferenceId);
          setVersion(data.article.version + 1);
        })
        .catch((error) => console.error("Error fetching article:", error));
    }
  }, [articleId]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch(`http://localhost:8080/confManagement/conferences/${authorId}`);
        if (response.ok) {
          const data = await response.json();
          setAvailableConferences(data); 
        } else {
          console.error("Failed to fetch conferences:", response.statusText);
          alert("Failed to fetch conferences. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching conferences:", error);
        alert("An error occurred while fetching conferences.");
      }
    };

    if (authorId) {
      fetchConferences();
    }
  }, [authorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(articleId !== 0){
      const articleData = {
        title,
        description,
        content,
        version
      };

      const response = await fetch(`http://localhost:8080/article/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Article updated:", data);
          alert("Article updated successfully!");
        } else {
          const text = await response.text();
          console.log("Article updated (non-JSON response):", text);
          alert(text);
        }
        onClose();
      } else {
        console.error("Failed to update article:", response.statusText);
        const errorText = await response.text();
        alert(`Failed to update article: ${errorText}`);
      }

    } else {
      let reviewers = '';

      const newArticle = {
      title,
      description,
      content,
      conferenceId: selectedConference,
      authorId: parseInt(authorId),
      version: 1,
      status: "pending"
    };

    try {
      const response = await fetch("http://localhost:8080/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      console.log("New article:", newArticle);
      const contentType = response.headers.get("content-type");

      if (response.ok) {

        // handle the response from database
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Article added:", data);
         
        } else {
          const text = await response.text(); 
          console.log("Article added (non-JSON response):", text);
          alert(text); 
        }

        // fetching all the reviewrs assigned for the chosen conference 
        // in order to random assign two for feedback

        //fetch reviewers
        const reviewersResponse = await fetch(`http://localhost:8080/confManagement/reviewer/${selectedConference}`);
        if (reviewersResponse.ok) {
            reviewers = await reviewersResponse.json();
        } else {
          console.error(
            "Failed to fetch reviewers:",
            reviewersResponse.statusText
          );
          alert("Article added, but failed to fetch reviewers.");
        }
        console.log("Reviewers fetched:", reviewers);

        // choose them randomly
        let chosenReviewers = [];
        if (reviewers.length >= 2) {
          const shuffled = reviewers.sort(() => 0.5 - Math.random()); 
          chosenReviewers = shuffled.slice(0, 2); 
        }else {
          chosenReviewers = reviewers;
        }
        console.log("Chosen reviewers:", chosenReviewers);

        //create review entries with reviewerId and articleId
        for (const reviewer of chosenReviewers) {
          const reviewData = {
            articleId: newArticleId,
            reviewerId: reviewer.authorId,
            comment: "", 
            status: "approved",
          };
          console.log("Review data:", reviewData);

          try {
            const reviewResponse = await fetch("http://localhost:8080/review",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
              }
            );

            if (reviewResponse.ok) {
              const review = await reviewResponse.json();
              console.log("Review created:", review);
            } else {
              console.error(
                "Failed to create review:",
                reviewResponse.statusText
              );
            }
          } catch (error) {
            console.error("Error creating review:", error);
          }
        }

        onClose();
      } else {
        console.error("Failed to add article:", response.statusText);
        const errorText = await response.text();
        alert(`Failed to add article: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert("An error occurred. Please try again.");
    }}
    
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-article-modal-title"
      aria-describedby="add-article-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="add-article-modal-title" variant="h6" gutterBottom>
          Add New Article
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            required
            margin="normal"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            required
            margin="normal"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            label="Conference"
            select
            fullWidth
            required
            margin="normal"
            value={selectedConference}  
            onChange={(e) => setSelectedConference(e.target.value)}
          >
            {availableConferences?.length > 0 ? (
              availableConferences.map((conf) => (
                <MenuItem key={conf.id} value={conf.id}>
                  {conf.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No conferences available
              </MenuItem>
            )}
          </TextField>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddArticle;
