const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/:id')
  .get(reviewController.getAllReviews)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

router
  .route('/')
  .get(reviewController.getAllReviews)
  // khi ma add review cho 1 tour thi id ad merge vao trong req nen se khong tim thay dia chi phia tren
  .post(
    authController.protect,
    reviewController.setTourUserId,
    reviewController.addReview
  );
module.exports = router;
