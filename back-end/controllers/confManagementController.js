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
  
  export { create, getAll, getById, update, remove, getStatus, getConferencesByAuthorId, fetchApprovedEntries };
  