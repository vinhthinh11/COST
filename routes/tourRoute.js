const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoute');

// neu nhu gap dia chi nhu ben duoi thi khi di qua router URL se dc dieu huong sang ben reviewRouter de xu ly => ve
router.use('/:id/reviews', reviewRouter);
// midldeware

router.get('/top-5-rating', tourController.getTop5Rating);
router.get('/get-tours-stats', tourController.getTourStats);
router.get('/get-monthly-plan/:year', tourController.getMonthlyPlan);
router
  .get('/', tourController.getAllTour)
  .post(
    '/',
    authController.protect,
    authController.restrict('admin'),
    tourController.addTour
  );
router
  .route('/:id')
  .get(tourController.findTour)
  .patch(tourController.updateTour)
  .delete(
    // authController.protect,
    // authController.restrict('admin', 'lead-guide'),
    tourController.deleteTour
  );
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// router
//   .route('/:tourId/reviews')
//   .get(reviewController.getReview)
//   .post(authController.protect, reviewController.addReview);
module.exports = router;

//
