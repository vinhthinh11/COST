const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const viewProductRoute = require('./viewProductRoute');
const reviewProductRoute = require('./reviewProductRoute');
const userProductRoute = require('./userProductRoute');

const router = express.Router();

//load index page
router.get('/', viewProductRoute);
router.use('/reviews/:id', reviewProductRoute);
router.use('/users/update/:id', userProductRoute);
router.get('/constructing', viewController.getConstructing);
router.get(
  '/tour/:id',
  authController.isLoggedIn,
  viewController.getTourDetail
);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/signup', authController.isLoggedIn, viewController.getSignup);
router.get('/me', authController.protect, viewController.getProfile);
router.get(
  '/my-bookings',
  authController.protect,
  viewController.getAllMyBookings
);
router.post(
  '/submit-user-data',
  authController.protect, //protect để next thông tin user sang req.user
  viewController.updateUserData
);

module.exports = router;
