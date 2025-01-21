import React from "react";
import "./FeedbackModal.css";
import { useState, useEffect } from "react";

function FeedbackModal({ articleId, onClose, reviewerId, reviewId }) {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const ARTICLE_URL = "http://localhost:8080/review/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Review status:", status);
    console.log("MODIFICAM ARTICOLUL", articleId);
    if (status === "pending") {
      console.log("Comentariu:", comment);
    }

    const updatedData = {
      status: status,
      comment: comment,
    };

    const createData = {
      status: status,
      comment: comment,
      reviewerId: reviewerId,
      articleId: articleId,
    };

    try {
      const response = await fetch(`${ARTICLE_URL}${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.log(
          "Nu există review pentru acest articol, se va crea unul nou."
        );
        response = await fetch(`${ARTICLE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createData),
        });
      }

      if (response.ok) {
        console.log("Review-ul a fost salvat/actualizat cu succes!", articleId);
        const responseData = await response.json();
        console.log("Comentariul a fost actualizat:", responseData);

        onClose();
      } else {
        console.error(
          "A apărut o eroare la actualizarea/recrearea review-ului",
          response.statusText
        );
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

          if (userReview) {
            console.log("asta ne intereseaza", userReview);
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
