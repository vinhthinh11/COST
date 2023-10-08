const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .post(authController.protect, orderController.getCheckoutSession)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route('/');
// khi ma add review cho 1 tour thi id ad merge vao trong req nen se khong tim thay dia chi phia tren
module.exports = router;
