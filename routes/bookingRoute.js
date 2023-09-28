const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router
  .route('/checkout-session/:tourID')
  .get(authController.protect, bookingController.getCheckoutSession);
module.exports = router;