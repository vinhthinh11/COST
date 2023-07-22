const express = require('express');

const route = express.Router();
const tourController = require('../controllers/tourController');

// midldeware

route
  .get('/', tourController.getAllToursOrTour)
  .post('/', tourController.addTour);
route
  .get('/:id', tourController.findTour)
  .patch('/:id', tourController.updateTour)
  .delete('/:id', tourController.deleteTour);
module.exports = route;
