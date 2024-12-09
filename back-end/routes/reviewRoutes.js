import * as reviewController from '../controllers/reviewController.js';
import express from 'express';

export const router=express.Router();

router.get('/search',reviewController.search);
router.get('/:id',reviewController.getReviewsForArticle);
// get by article status 
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);

router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);