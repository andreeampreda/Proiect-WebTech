import React, { useState, version, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";

function AddArticle({ open, onClose, authorId, conferences }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedConference, setSelectedConference] = useState("");
  const [availableConferences, setAvailableConferences] = useState([]); // Redenumit din `conferences`

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
  // useEffect(() => {
  //   const fetchConferences = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8080/confManagement/status/${authorId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         // Filtrare doar conferințele cu status "approved"
  //         const approvedConferences = data.filter((conf) => conf.status === "approved");
  //         setConferences(approvedConferences);
  //       } else {
  //         console.error("Failed to fetch conferences:", response.statusText);
  //         alert("Failed to fetch conferences. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching conferences:", error);
  //       alert("An error occurred while fetching conferences.");
  //     }
  //   };

  //   if (authorId) {
  //     fetchConferences();
  //   }
  // }, [authorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      description,
      content,
      conferenceId: 1,
      authorId: authorId,
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

      if (response.ok) {
        const data = await response.json();
        console.log("Article added:", data);
        alert("Article added successfully!");
        onClose();
      } else {
        console.error("Failed to add article:", response.statusText);
        alert("Failed to add article. Please try again.");
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert("An error occurred. Please try again.");
    }
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
            value={1}
            onChange={(e) => setSelectedConference(e.target.value)}
          >
            {conferences?.length > 0 ? (
              conferences.map((conf) => (
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
