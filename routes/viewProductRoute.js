const express = require('express');
const viewProductController = require('../controllers/viewProductController');
const authController = require('../controllers/authController');
// const bookingController = require('../controllers/bookingController');

const router = express.Router();

//  lay trang san pham va in ra cho
router.get(
  '/',
  // bookingController.createBookingCheckout,
  viewProductController.getProductPage
);

// router.get(
//   '/tour/:id',
//   authController.isLoggedIn,
//   viewProductController.getTourDetail
// );
// router.get('/login', authController.isLoggedIn, viewProductController.getLogin);
// router.get(
//   '/signup',
//   authController.isLoggedIn,
//   viewProductController.getSignup
// );
// router.get('/me', authController.protect, viewProductController.getProfile);
// router.get(
//   '/my-bookings',
//   authController.protect,
//   viewProductController.getAllMyBookings
// );
// router.post(
//   '/submit-user-data',
//   authController.protect, //protect để next thông tin user sang req.user
//   viewProductController.updateUserData
// );

module.exports = router;
