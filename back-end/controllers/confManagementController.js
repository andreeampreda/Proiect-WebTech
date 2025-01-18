import * as confManagementService from "../services/confManagementServices.js";
  
  const create = async (req, res) => {
    try {
        const { confId, authorId, status } = req.body; 

        if (!confId || !authorId) {
            return res.status(400).json({ error: "confId and authorId are required" });
        }

        const newConference = await confManagementService.createConfManagement({ confId, authorId, status });
        res.status(201).json(newConference); 
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
  
  export { create, getAll, getById, update, remove, getStatus };
  