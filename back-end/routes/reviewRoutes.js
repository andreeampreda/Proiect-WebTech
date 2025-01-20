import * as reviewController from '../controllers/reviewController.js';
import express from 'express';

export const router=express.Router();

router.get('/search',reviewController.search);
router.get('/:id',reviewController.getReviewsForArticle);
<<<<<<< HEAD
=======
router.get('/pending/:reviewerId', reviewController.getPendingArticlesByReviewer);
// get by article status 
>>>>>>> d2ae886a3a618566da852e60e66c80ca6221ea92
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/status/:reviewId',reviewController.getReviewStatus);

router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);