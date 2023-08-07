const express = require('express');

const route = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

// midldeware

route.get('/top-5-rating', tourController.getTop5Rating);
route.get('/get-tours-stats', tourController.getTourStats);
route.get('/get-monthly-plan/:year', tourController.getMonthlyPlan);
route
  .get('/', authController.protect, tourController.getAllToursOrTour)
  .post('/', tourController.addTour);
route
  .route('/:id')
  .get(tourController.findTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourController.deleteTour,
  );
module.exports = route;

//
