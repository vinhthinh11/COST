const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);
router
  .route('/checkout-session/:tourID')
  .get(bookingController.getCheckoutSession);

router.use(authController.restrict('admin'));
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.addBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .delete(bookingController.deleteBooking)
  .patch(bookingController.updateBooking);
module.exports = router;
