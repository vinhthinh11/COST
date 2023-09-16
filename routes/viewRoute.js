const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

//load index page
router.get('/', viewController.getOverview);
router.get('/tour/:id', viewController.getTourDetail);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignup);

module.exports = router;
