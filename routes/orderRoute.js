const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();
router
  .route('/:id')
  .get(orderController.findOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router
  .route('/')
  .get(orderController.findAllOrder)
  .post(orderController.addOrder);
// khi ma add review cho 1 tour thi id ad merge vao trong req nen se khong tim thay dia chi phia tren
module.exports = router;
