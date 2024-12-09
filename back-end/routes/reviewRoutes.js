import * as reviewController from '../controllers/reviewController.js';
import express from 'express';

export const router=express.Router();

router.get('/search',reviewController.search);
router.get('/:id',reviewController.getReviewsForArticle);