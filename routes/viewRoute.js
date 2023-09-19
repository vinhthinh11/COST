const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// dung middleware to check if user is logged in
router.use(authController.isLoggedIn);
//load index page
router.get('/', viewController.getOverview);
router.get('/tour/:id', viewController.getTourDetail);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignup);

module.exports = router;
