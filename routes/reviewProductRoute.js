const express = require('express');
const reviewProductController = require('../controllers/reviewProductController');

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(reviewProductController.addProductReview)
  .get(reviewProductController.getReviewProduct);
router
  .route('/:id')
  .patch(reviewProductController.updateProductReview)
  .delete(reviewProductController.deleteProductReview);

module.exports = router;
