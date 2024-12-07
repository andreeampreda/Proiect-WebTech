import * as artController from '../controllers/articolController.js';
import express from 'express'

export const router=express.Router();

router.get("/",artController.getArticles);
router.get("/search",artController.search);

router.post("/",artController.createArticle);
