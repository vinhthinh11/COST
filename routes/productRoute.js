const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
router
  .route('/:id')
  .get(productController.findProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route('/')
  .get(productController.findAllProduct)
  // khi ma add review cho 1 tour thi id ad merge vao trong req nen se khong tim thay dia chi phia tren
  .post(
    productController.uploadProductUrl,
    productController.resizeProductUrl,
    productController.addProduct
  );
module.exports = router;
