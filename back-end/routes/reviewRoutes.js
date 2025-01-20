import * as reviewController from '../controllers/reviewController.js';
import express from 'express';

export const router=express.Router();

router.get('/search',reviewController.search);
router.get('/:id',reviewController.getReviewsForArticle);

router.get('/pending/:reviewerId', reviewController.getPendingArticlesByReviewer);
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/status/:reviewId',reviewController.getReviewStatus);

router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);