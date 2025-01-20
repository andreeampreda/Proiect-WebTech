import React, { useState, useEffect }  from "react";
import "./ConferenceContent.css";

// Conference Modal

function ConferenceContent({ conference, onClose }) {
  const [authors, setAuthors] = useState([]);

  // Fetch authors by conference ID
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`http://localhost:8080/confManagement/${conference.id}/authors/`);
        const data = await response.json();
    
        console.log("Fetched authors:", data); // Verifică structura răspunsului
    
        if (data.authors && Array.isArray(data.authors)) {
          setAuthors(data.authors); // Setează doar array-ul de autori
        } else {
          console.error("Invalid authors format:", data);
          setAuthors([]); // Setează un array gol dacă formatul este greșit
        }
      } catch (error) {
        console.error("Error fetching authors for conference:", error);
        setAuthors([]);
      }
    };
    

    if (conference?.id) {
      fetchAuthors();
    }
  }, [conference]);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          close (x)
        </button>
        <h3 id="title">{conference.name}</h3>
        <p>
          <strong>Location:</strong> {conference.location}
        </p>
        <p>
          <strong>Date:</strong> {conference.date}
        </p>

        {/* Afișare autori */}
        <div>
  <strong>Authors:</strong>
  {authors.length > 0 ? (
    <ul>
      {authors.map((author) => (
        <li key={author.id}>
          {author.firstName} {author.lastName}
        </li>
      ))}
    </ul>
  ) : (
    <p>No authors found for this conference.</p>
  )}
</div>

      </div>
    </div>
  );
}


export default ConferenceContent;
