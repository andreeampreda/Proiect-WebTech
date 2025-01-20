import React, { useState } from "react";
import "./AddConference.css";

function AddConference({ onClose, authorId }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "location") setLocation(value);
    if (name === "date") setDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/conference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          location: location,
          date: date,
          organizerId: authorId,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Conference added:", data);
          alert("Conference added successfully!");
        } else {
          const text = await response.text();
          console.log("Conference added:", text);
          alert(text);
        }
        onClose();
      } else {
        console.error("Failed to add conference:", response.statusText);
        const errorText = await response.text();
        alert(`Failed to add conference: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding conference:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          Close (x)
        </button>
        <form onSubmit={handleSubmit}>
          <h3>Add New Conference</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Add Conference</button>
        </form>
      </div>
    </div>
  );
}

export default AddConference;
