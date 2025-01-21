import React from "react";
import "./FeedbackModal.css";
import { useState, useEffect } from "react";

function FeedbackModal({ articleId, onClose, reviewerId }) {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");

  const ARTICLE_URL = "http://localhost:8080/review/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Review status:", status);
    console.log(articleId);
    if (status === "pending") {
      console.log("Comentariu:", comment);
    }

    const updatedData = {
      status: status,
      comment: comment,
    };

    try {
      const response = await fetch(`${ARTICLE_URL}${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Review updated successfully!");
        onClose();
      } else {
        console.error("Failed to update review:", response.statusText);
      }
    } catch (error) {
      console.error("Error during review update:", error);
    }

    onClose();
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    fetch(`${ARTICLE_URL}${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ce am extras", data.review);
        console.log("user curent", reviewerId);
        if (data.review && data.review.length > 0) {
          console.log("id exstras", data.review);
          let userReview;
          for (let review of data.review) {
            if (parseInt(review.reviewerId) === parseInt(reviewerId))
              userReview = review;
          }
          console.log("review ul deci", userReview);
          if (userReview) {
            setStatus(userReview.status);
          }
        }
      })
      .catch((error) => console.error("Error fetching review:", error));
  }, [articleId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          Close (x)
        </button>
        <form className="form-conf" onSubmit={handleSubmit}>
          <h3>Change Article Status</h3>

          <div>
            <label>Status:</label>
            <select value={status} onChange={handleStatusChange}>
              <option value="" disabled>
                Select Article State
              </option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {status === "pending" && (
            <div className="commentArea">
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
              />
            </div>
          )}

          <button className="submitBtn " type="submit">
            Review Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
