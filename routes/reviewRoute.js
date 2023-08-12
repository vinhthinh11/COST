const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.addReview);
module.exports = router;
