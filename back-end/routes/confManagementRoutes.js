import express from "express";
import * as confManagementController from "../controllers/confManagementController.js";

export const router = express.Router();

router.post("/", confManagementController.create); 
router.get("/", confManagementController.getAll); 
router.get("/:id", confManagementController.getById); 
router.get("/status/:authorId", confManagementController.getStatus);
router.get('/conference/:conferenceId/pending-authors',confManagementController.fetchPendingAuthors);
router.get("/conferences/:authorId", confManagementController.getConferencesByAuthorId);
router.get("/reviewer/:confId", confManagementController.fetchApprovedEntries);
router.get("/:confId/authors", confManagementController.getAuthorsByConference);

router.put("/update-status", confManagementController.updateStatus);
router.put("/:id", confManagementController.update); 
router.delete("/:id", confManagementController.remove); 

