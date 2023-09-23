const express = require('express');
const reviewProductController = require('../controllers/reviewProductController');

const router = express.Router();
router
  .route('/:id')
  .post(reviewProductController.addProductReview)
  .get(reviewProductController.findProductReview)
  .patch(reviewProductController.updateProductReview)
  .delete(reviewProductController.deleteProductReview);

router
  .route('/')
  // khi ma add review cho 1 tour thi id ad merge vao trong req nen se khong tim thay dia chi phia tren
  .get(reviewProductController.findProductReview);
module.exports = router;
