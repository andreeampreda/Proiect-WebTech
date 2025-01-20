import * as confManagementService from "../services/confManagementServices.js";
import Conference from "../models/conferenceModel.js";
  
  const create = async (req, res) => {
    try {
        const { confId, authorId, status } = req.body; 

        if (!confId || !authorId) {
            return res.status(400).json({ error: "confId and authorId are required" });
        }

        const newConference = await confManagementService.createConfManagement({ confId, authorId, status });
        res.status(201).json(newConference.article); 
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };
  
  const getAll = async (req, res) => {
    try {
      const entries = await confManagementService.getAllConfManagements();
      res.status(200).json(entries);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await confManagementService.getConfManagementById(id);
      res.status(200).json(entry);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  const fetchApprovedEntries = async (req, res) => {
    const { confId } = req.params;

    try {
      const reviewers = await confManagementService.getReviewersByConfId(confId);
      res.status(200).json(reviewers);
    } catch (error) {
      console.error(`Error fetching reviewers for confId ${confId}:`, error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getConferencesByAuthorId = async (req, res) => {
    try {
      console.log("Request params:", req.params); 
  
      const { authorId } = req.params;
      console.log("Author ID:", authorId);
  
      if (!authorId) {
        return res.status(400).json({ error: "Author ID is required" });
      }
  
      const conferences = await confManagementService.getConferencesByAuthorId(authorId);
      res.status(200).json(conferences);
    } catch (error) {
      console.error("Error fetching conferences:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedEntry = await confManagementService.updateConfManagement(id, data);
      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const remove = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await confManagementService.deleteConfManagement(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

    const getStatus = async (req, res) => {
        try {
        const { authorId } = req.params; 
        const statusEntries = await confManagementService.getStatusByAuthorId(authorId);
        res.status(200).json(statusEntries);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    };


    const fetchPendingAuthors = async (req, res) => {
      try {
        const { conferenceId } = req.params;
        if (!conferenceId) {
          return res.status(400).json({ error: "Conference ID is required" });
        }
    
        const pendingAuthors = await confManagementService.getPendingAuthorsByConference(conferenceId);
    
        res.status(200).json(pendingAuthors);
      } catch (error) {
        console.error("Error fetching pending authors:", error.message);
        res.status(500).json({ message: "Error fetching pending authors", error: error.message });
      }
    };
    
    const getAuthorsByConference = async (req, res) => {
      try {
        const { confId } = req.params;
    
        if (!confId) {
          return res.status(400).json({ error: "Conference ID is required" });
        }
    
        const authors = await confManagementService.getAuthorsByConferenceId(confId);
    
        if (authors.length === 0) {
          return res.status(404).json({ message: "No authors found for this conference" });
        }
    
        return res.status(200).json({ authors });
      } catch (error) {
        console.error("Error in getAuthorsByConference:", error.message);
        return res.status(500).json({ error: "Failed to fetch authors for the conference" });
      }
    };
    
  
  export { create, getAll, getById, update, remove, getStatus, getConferencesByAuthorId ,fetchPendingAuthors, fetchApprovedEntries, getAuthorsByConference };

  