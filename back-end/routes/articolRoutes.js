import * as artController from '../controllers/articolController.js';
import express from 'express'

export const router=express.Router();

router.get("/",artController.getArticles);
router.get("/:id", artController.getById);
router.get('/search/conference/:conferenceId', artController.searchByConference);
router.get('/search/author/:authorId', artController.searchByAuthor);
router.post("/",artController.createArticle);

router.put("/:id", artController.updateArticle);
router.delete("/:id", artController.deleteArticle);
