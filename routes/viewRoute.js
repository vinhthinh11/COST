const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

//load index page
router.get('/', viewController.getOverview);
router.get('/tour', viewController.getTourDetail);

module.exports = router;
