const express = require('express');
const route = express.Router();
const tourController = require('../controllers/tourController');
route
  .get('/:id?', tourController.getAllToursOrTour)
  .post('/', tourController.addTour)
  .patch('/:id', tourController.updateTour)
  .delete('/:id', tourController.deleteTour);
module.exports = route;
